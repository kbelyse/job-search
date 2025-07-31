document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("job-form");

  // Handle form submission to fetch jobs
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get search parameters from input fields
    const keyword = document.getElementById("search").value.trim();
    const category = document.getElementById("category").value;

    // Construct API URL dynamically based on user input
    const url = `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}`;

    console.log("Fetching:", url);

    try {
      const res = await fetch(url);
      const data = await res.json();

      // Clear previous results before adding new ones
      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      // Iterate through job results and create UI elements
      data.jobs.forEach((job) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company_name}</p>
          <p><strong>Location:</strong> ${job.candidate_required_location}</p>
          <a href="${job.url}" target="_blank" rel="noopener noreferrer">View Job</a>
        `;
        resultsContainer.appendChild(div);
      });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Failed to fetch jobs. Please try again later.");
    }
  });
});
