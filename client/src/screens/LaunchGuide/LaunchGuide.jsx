import React from "react";

const LaunchGuide = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Product Space Launch Guide</h1>
      <h2 style={styles.subHeading}>Launching your product on Product Space</h2>
      <ol style={styles.list}>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>Step 1: Prepare your product</h3>
          <p>
            Ensure that your product is ready for launch. This includes having a
            clear description, compelling visuals, and any necessary links or
            documentation.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>Step 2: Sign up or log in</h3>
          <p>
            If you haven't already, sign up for an account on Product Space. If
            you're an existing user, simply log in to your account.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>
            Step 3: Navigate to the "Submit Product" page
          </h3>
          <p>
            Once you're logged in, find the "Submit Product" button in the
            navigation menu and click on it.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>Step 4: Fill in the details</h3>
          <p>
            Enter the required details about your product, such as its name,
            description, website URL, and relevant tags or categories.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>Step 5: Upload visuals</h3>
          <p>
            Add eye-catching visuals to showcase your product. This could
            include screenshots, videos, or any other media that helps potential
            users understand your product better.
          </p>
          <img
            src="https://example.com/product-screenshot.png"
            alt="Product Screenshot"
            style={styles.image}
          />
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>Step 6: Submit your product</h3>
          <p>
            Review all the information you've provided and click the "Submit"
            button to launch your product on Product Space.
          </p>
        </li>
        <li style={styles.listItem}>
          <h3 style={styles.stepHeading}>Step 7: Engage with the community</h3>
          <p>
            Once your product is live, be active in the Product Space community.
            Respond to comments and feedback, and engage with potential users to
            generate interest and gain valuable insights.
          </p>
          <img
            src="https://example.com/product-community.png"
            alt="Product Community"
            style={styles.image}
          />
        </li>
      </ol>
      <div style={styles.chartContainer}>
        <h2 style={styles.chartHeading}>Product Launch Analytics</h2>
        {/* Add your chart components or embed code here */}
        <p style={styles.chartDescription}>
          Track and analyze the performance of your product launch using
          comprehensive analytics and charts.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px",
    borderRadius: "8px",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "40px",
  },
  subHeading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  list: {
    paddingLeft: "40px",
  },
  listItem: {
    marginBottom: "40px",
  },
  stepHeading: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  image: {
    maxWidth: "100%",
    marginBottom: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  chartContainer: {
    marginTop: "40px",
    background: "#FFFFFF",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  chartHeading: {
    fontSize: "24px",
    marginBottom: "10px",
    color: "#333333",
  },
  chartDescription: {
    color: "#666666",
  },
};

export default LaunchGuide;
