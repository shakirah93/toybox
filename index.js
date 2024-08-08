// Add a new block
document
  .getElementById("addBlockForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const block = {
      color: document.getElementById("blockColor").value,
    };
    try {
      const response = await fetch("http://localhost:5000/blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(block),
      });
      if (response.ok) {
        alert("Block added!");
        document.getElementById("addBlockForm").reset();
        fetchBlocks();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Update an existing block
document
  .getElementById("updateBlockForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const blockId = parseInt(document.getElementById("updateBlockId").value);
    const updatedBlock = {
      color: document.getElementById("updateBlockColor").value,
    };
    try {
      const response = await fetch(`http://localhost:5000/blocks/${blockId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlock),
      });
      if (response.ok) {
        alert("Block updated!");
        document.getElementById("updateBlockForm").reset();
        fetchBlocks();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Delete a block
document
  .getElementById("deleteBlockForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const blockId = parseInt(document.getElementById("deleteBlockId").value);
    try {
      const response = await fetch(`http://localhost:5000/blocks/${blockId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Block deleted!");
        document.getElementById("deleteBlockForm").reset();
        fetchBlocks();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Fetch and display all blocks
function fetchBlocks() {
  fetch("http://localhost:5000/blocks")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((blocks) => {
      const blockList = document.getElementById("blockList");
      const noBlocksMessage = document.getElementById("noBlocksMessage");

      blockList.innerHTML = "";

      if (blocks.length > 0) {
        noBlocksMessage.style.display = "none"; // Hide the message if there are blocks
        blocks.forEach((block, key) => {
          const listItem = document.createElement("li");
          listItem.textContent = `ID: ${key + 1}, Color: ${block.color}`;
          blockList.appendChild(listItem);
        });
      } else {
        noBlocksMessage.style.display = "block"; // Show the message if there are no blocks
      }
    })
    .catch((error) =>
      console.error("There was a problem with your fetch operation:", error)
    );
}

// Fetch blocks and display them when the page loads
document.addEventListener("DOMContentLoaded", function () {
  fetchBlocks();
});

// Show the selected form and hide the others
function showForm(formId) {
  document.getElementById("addBlockForm").style.display = "none";
  document.getElementById("updateBlockForm").style.display = "none";
  document.getElementById("deleteBlockForm").style.display = "none";
  document.getElementById(formId).style.display = "block";
}

// Event listeners for navbar links
document.getElementById("addBlockLink").addEventListener("click", function () {
  showForm("addBlockForm");
});

document
  .getElementById("updateBlockLink")
  .addEventListener("click", function () {
    showForm("updateBlockForm");
  });

document
  .getElementById("deleteBlockLink")
  .addEventListener("click", function () {
    showForm("deleteBlockForm");
  });
