document.getElementById('generateButton').addEventListener('click', function () {
    const prompt = document.getElementById('promptInput').value;
    if (prompt) {
        generateImage(prompt);
    } else {
        alert('Please enter a prompt.');
    }
});

async function generateImage(prompt) {
    const apiUrl = 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5';
    const headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'application/json'
    };
    const data = {
        inputs: prompt,
        options: {
            wait_for_model: true // Wait for the model to load
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to generate image. Please try again.');
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the image. Please check the console for details.');
    }
}