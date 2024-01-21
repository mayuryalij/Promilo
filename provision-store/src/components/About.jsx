const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">About</h2>
      <p className="text-lg">
        Welcome to our project! Here a brief overview of the folder structure.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Folder Structure:</h3>
      <p className="text-lg">
        Our project follows a typical React project structure:
      </p>
      <ul className="list-disc pl-6 mt-4">
        <li>src/components</li>
        <li>src/App.js</li>
        <li>src/index.js</li>
        <li>public/index.html:</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Challenges Faced:</h3>
      <p className="text-lg">
        During the development process, we encountered a few challenges such as
        integrating third-party libraries, managing state efficiently, and
        ensuring responsive design. Overcoming these challenges contributed to
        the project growth and our learning experience.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Getting Started:</h3>
      <p className="text-lg">
        To start the project on your local machine, follow these steps:
      </p>
      <ol className="list-decimal pl-6">
        <li>
          Clone the repository: <code>git clone [repository_url]</code>
        </li>
        <li>
          Navigate to the project folder: <code>cd [project_folder]</code>
        </li>
        <li>
          Install dependencies: <code>npm install</code>
        </li>
        <li>
          Start the development server: <code>npm start</code>
        </li>
      </ol>
      <p>This will launch the project in your default web browser.</p>
    </div>
  );
};

export default About;
