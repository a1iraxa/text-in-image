document.getElementById('generateButton').addEventListener('click', function () {
    const prompt = document.getElementById('promptInput').value;
    if (prompt) {
        generateImage(prompt);
    } else {
        alert('Please enter a prompt.');
    }
});

async function generateImage(prompt) {
    const apiUrl = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';
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

    // Show loader
    const loader = document.getElementById('loader');
    const imageContainer = document.getElementById('imageContainer');
    loader.style.display = 'block';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            if (response.status === 503) {
                // Model is loading, retry after a delay
                console.log('Model is loading. Retrying in 10 seconds...');
                await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
                return generateImage(prompt); // Retry
            } else {
                throw new Error('Failed to generate image. Please try again.');
            }
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        imageContainer.innerHTML = ''; // Clear previous image
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while generating the image. Please check the console for details.');
    } finally {
        // Hide loader
        loader.style.display = 'none';
    }
}