document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("job-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const keyword = document.getElementById("search").value;
    const category = document.getElementById("category").value;
    const url = `https://remotive.com/api/remote-jobs?search=${keyword}&category=${category}`;


    console.log("Fetching:", url);

    try {
      const res = await fetch(url);
      const data = await res.json();

      const resultsContainer = document.getElementById("results");
      resultsContainer.innerHTML = "";

      data.jobs.forEach((job) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company_name}</p>
          <p><strong>Location:</strong> ${job.candidate_required_location}</p>
          <a href="${job.url}" target="_blank">View Job</a>
        `;
        resultsContainer.appendChild(div);
      });
    } catch (err) {
      console.error("Error fetching jobs:", err);
      alert("Failed to fetch jobs. Please try again later.");
    }
  });
});
