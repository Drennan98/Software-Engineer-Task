document.getElementById("generate-button").addEventListener("click", async () => {
    const scriptInput = document.getElementById("script-input").value;
    const outputBox = document.getElementById("output");

    if (!scriptInput.trim()) {
        outputBox.textContent = "Please enter a script."
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
                prompt: `Create a catchy YouTube based on this script:\n${scriptInput}`,
                max_tokens: 100,
            }),
        });

        const data = await response.json();
        const intro = data.choices[0]?.text.trim();
        outputBox.textContent = intro || "No intro generated. Please try again.";
    }   catch (error) {
        console.error("Error:", error);
        outputBox.textContent = "Failed to generate intro. Please try again.";
    }
});