import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory data store
  let jobs = [
    {
      id: '1',
      title: 'Senior Product Designer',
      company: 'Tesla',
      location: 'Palo Alto, CA',
      category: 'Design',
      description: '<p>We are looking for a Senior Product Designer to join our team and help us build the future of sustainable energy.</p>',
      type: 'Full-time',
      level: 'Senior',
      postedAt: '2 days ago',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg'
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      category: 'Technology',
      description: '<p>Join our search team to build the future of information.</p>',
      type: 'Full-time',
      level: 'Mid',
      postedAt: '1 day ago',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg'
    },
    {
      id: '3',
      title: 'Marketing Manager',
      company: 'Microsoft',
      location: 'Redmond, WA',
      category: 'Marketing',
      description: '<p>Lead our cloud marketing initiatives.</p>',
      type: 'Full-time',
      level: 'Senior',
      postedAt: '3 days ago',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
    }
  ];

  let applications = [];

  // API routes
  app.get("/api/jobs", (req, res) => {
    res.json(jobs);
  });

  app.get("/api/jobs/:id", (req, res) => {
    const job = jobs.find(j => j.id === req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  });

  app.post("/api/jobs", (req, res) => {
    const newJob = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      postedAt: 'Just now'
    };
    jobs.push(newJob);
    res.status(201).json(newJob);
  });

  app.delete("/api/jobs/:id", (req, res) => {
    jobs = jobs.filter(j => j.id !== req.params.id);
    res.status(204).send();
  });

  app.post("/api/applications", (req, res) => {
    const newApplication = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      appliedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    res.status(201).json(newApplication);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
