// Get the libraries we need
const express = require("express");
const fs = require("fs");
const math = require("mathjs");
const app = express();
const PORT = 3000;
const cors = require("cors");

// Let's use CORS
app.use(cors());

const historyFile = "history.json";
let history;

// Try to load history or set it as an empty list
try {
  history = JSON.parse(fs.readFileSync(historyFile, "utf8"));
} catch (error) {
  history = [];
}

// Add to history and save it
function saveHistory(question, answer) {
  history.push({ question, answer });

  // Only keep the last 20
  if (history.length > 20) {
    history.shift();
  }

  // Save to file
  fs.writeFileSync(historyFile, JSON.stringify(history));
}

// Show available routes
app.get("/", (req, res) => {
  res.send(
    "<h1>Endpoints:</h1><ul><li>/number1/plus/number2</li><li>/number1/minus/number2</li><li>/number1/into/number2</li><li>/number1/divide/number2</li><li>/number1/percent/number2</li><li>/sqrt/number</li><li>/factorial/number</li><li>/number1/power/number2</li><li>/history</li></ul>"
  );
});

// Show the history
app.get("/history", (req, res) => {
  res.send(
    history.map((item) => `<p>${item.question} = ${item.answer}</p>`).join("")
  );
});

// Handle math operations from the URL
app.get("/*", (req, res) => {
  const expressionArray = req.path.substring(1).split("/");
  let expression = "";

  // Convert URL to math expression
  for (let i = 0; i < expressionArray.length; i++) {
    switch (expressionArray[i]) {
      case "plus":
        expression += " + ";
        break;
      case "minus":
        expression += " - ";
        break;
      case "into":
        expression += " * ";
        break;
      case "divide":
        expression += " / ";
        break;
      case "percent":
        expression += " * ";
        i++;
        if (!isNaN(expressionArray[i])) {
          expression += expressionArray[i] + " / 100";
        } else {
          res.status(400).json({ error: "Invalid percentage" });
          return;
        }
        break;
      case "sqrt":
        expression = `sqrt(${expression})`;
        break;
      case "factorial":
        expression = `factorial(${expression})`;
        break;
      case "power":
        expression += " ^ ";
        i++;
        expression += expressionArray[i];
        break;
      default:
        if (expression.endsWith("^ ")) {
          expression += expressionArray[i];
        } else {
          expression += " " + expressionArray[i];
        }
        break;
    }
  }

  // Try to calculate the result
  try {
    const result = math.evaluate(expression);
    const response = { question: expression, answer: result };
    saveHistory(expression, result);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: "Invalid expression" });
  }
});

// Start the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
