document.getElementById("generate-button").addEventListener("click", async () => {
    const scriptInput = document.getElementById("script-input").value;
    const outputBox = document.getElementById("output");
  
    if (!scriptInput.trim()) {
      outputBox.textContent = "Please enter a script.";
      return;
    }
  
    outputBox.textContent = "Generating intro...";
  
    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`, 
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `Create a catchy YouTube intro based on this script:\n${scriptInput}`,
          max_tokens: 150,
        }),
      });
  
      const data = await response.json();
      console.log(data);
      const intro = data.choices[0]?.text.trim();
      outputBox.textContent = intro || "No intro generated. Please try again.";
    } catch (error) {
      console.error("Error:", error);
      outputBox.textContent = "Failed to generate intro. Please try again.";
    }
  });
  