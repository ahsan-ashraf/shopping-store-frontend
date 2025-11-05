import {
  Box,
  Container,
  Typography,
  Divider,
  Chip,
  Grid,
  Paper,
  Stack,
  useTheme,
  Link,
} from "@mui/material";

const AboutPage = () => {
  const theme = useTheme();

  const techStack = [
    "React",
    "TypeScript",
    "TanStack Query",
    "Context API",
    "Redux Toolkit",
    "Axios",
    "React Router v7",
    "Formik + Yup",
    "Material UI v5",
    "ThemeProvider",
    "Framer Motion",
    "Stripe",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Vercel",
    "AWS",
    "Docker",
    "GitHub",
    "CI/CD Pipelines",
  ];

  const skills = [
    {
      category: "Frontend",
      items: [
        "React",
        "TypeScript",
        "Material UI",
        "Redux Toolkit",
        "TanStack Query",
        "Framer Motion",
        "Responsive Design",
        "Component Architecture",
      ],
    },
    {
      category: "Backend",
      items: [
        ".NET Core",
        "Node.js",
        "Express.js",
        "REST APIs",
        "Authentication (JWT)",
        "Role-based Access Control",
      ],
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "SQL Server"],
    },
    {
      category: "DevOps / Tools",
      items: [
        "Docker",
        "AWS",
        "Vercel",
        "GitHub",
        "CI/CD Pipelines",
        "Version Control (Git)",
      ],
    },
    {
      category: "Game Development",
      items: [
        "Unity 3D",
        "C#",
        "Game Physics",
        "UI Systems",
        "Level Design",
        "Asset Optimization",
      ],
    },
  ];

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      {/* ===== Project Overview ===== */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: theme.palette.primary.main,
        }}
      >
        About This Project
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        This project is a fully functional{" "}
        <strong>shopping store web application</strong> developed as a{" "}
        <strong>portfolio showcase</strong> to demonstrate my expertise in
        full-stack engineering, scalable architecture design, and professional
        UI/UX implementation. It mirrors the workflows and complexity of modern
        e-commerce systems while being designed from scratch using the{" "}
        <strong>MERN stack</strong> and advanced frontend practices.
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        The project is not just about creating a UI — it’s a demonstration of
        complete system design: database architecture, authentication flow,
        real-world state management, and component communication. Every detail,
        from folder structure to API handling, follows
        <strong> scalable, maintainable, and industry-standard</strong>{" "}
        practices.
      </Typography>

      <Divider sx={{ my: 5 }} />

      {/* ===== Purpose & Goals ===== */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Project Purpose & Goals
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        The main goal of this project is to serve as a realistic simulation of a
        professional e-commerce system that recruiters or clients can review to
        assess my capabilities in:
      </Typography>
      <Box
        component="ul"
        sx={{ pl: 3, color: theme.palette.text.secondary, mb: 4 }}
      >
        <li>Designing end-to-end full-stack web applications</li>
        <li>Implementing role-based access and multi-user systems</li>
        <li>Creating reusable, modular frontend architectures</li>
        <li>Ensuring responsive, accessible, and performant design</li>
        <li>
          Demonstrating practical use of APIs, database, and deployment
          pipelines
        </li>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* ===== Key Features ===== */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Key Features
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 3 }}
      >
        The system supports multiple roles and mimics real business workflows,
        including:
      </Typography>

      <Box
        component="ul"
        sx={{ pl: 3, color: theme.palette.text.secondary, mb: 4 }}
      >
        <li>User Authentication & Authorization with JWT Tokens</li>
        <li>
          <strong>Five User Roles:</strong> Super Admin, Admin, Seller, Rider,
          Buyer — each with unique access levels and dashboard components
        </li>
        <li>
          Seller storefront management (metadata, media uploads, dynamic
          pricing)
        </li>
        <li>
          Buyer features like wishlist, cart, checkout, and order tracking
        </li>
        <li>Integrated payment gateway using Stripe API</li>
        <li>Analytics dashboards for seller performance and engagement</li>
        <li>
          Delivery management via Rider module integrated with Google Maps
        </li>
        <li>Dark/Light theming using Material UI ThemeProvider</li>
        <li>Form handling using Formik + Yup for validation</li>
        <li>Animations and page transitions via Framer Motion</li>
        <li>Real-time data fetching and caching using TanStack Query</li>
        <li>State management with Redux Toolkit and Context API</li>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* ===== Technical Architecture ===== */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Technical Architecture
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 3 }}
      >
        The entire application follows a{" "}
        <strong>modular and layered architecture</strong> for easy maintenance
        and scalability:
      </Typography>

      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
          p: 3,
          mb: 4,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Frontend
        </Typography>
        <Typography sx={{ mb: 2, color: theme.palette.text.secondary }}>
          Built with React + TypeScript, using MUI for UI components, TanStack
          Query for efficient server state management, and Framer Motion for
          fluid UI transitions.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Backend
        </Typography>
        <Typography sx={{ mb: 2, color: theme.palette.text.secondary }}>
          The backend (Node.js/Express or .NET Core) handles authentication,
          authorization, and business logic. REST APIs provide data to the
          frontend via secure JWT-based tokens.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Database
        </Typography>
        <Typography sx={{ mb: 2, color: theme.palette.text.secondary }}>
          Data is stored in PostgreSQL, with potential support for MongoDB for
          unstructured modules. Database schema ensures relational integrity for
          roles, products, orders, and transactions.
        </Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
          Deployment
        </Typography>
        <Typography sx={{ color: theme.palette.text.secondary }}>
          Deployed on Vercel (frontend) and AWS (backend), using Docker for
          containerization and CI/CD pipelines for automated builds and updates.
        </Typography>
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* ===== UI/UX Design Approach ===== */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Design & UI/UX Philosophy
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        The design approach focuses on{" "}
        <strong>clarity, consistency, and usability</strong>. Each component
        follows Material Design principles — clean typography, clear hierarchy,
        and balanced color contrast. The entire app is responsive and optimized
        for both desktop and mobile devices.
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        The interface uses a <strong>modular layout</strong> (Sidebar + Header +
        Footer + Main Content), ensuring scalability for additional modules and
        role-based dashboards. All repetitive UI sections like cards, tables,
        and forms are implemented as reusable React components to maintain
        design consistency.
      </Typography>

      <Divider sx={{ my: 5 }} />

      {/* ===== Tech Stack ===== */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Tech Stack
      </Typography>
      <Grid container spacing={1} sx={{ mb: 4 }}>
        {techStack.map((tech) => (
          <Grid key={tech}>
            <Chip
              label={tech}
              sx={{
                fontWeight: 500,
                bgcolor: theme.palette.background.default,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 5 }} />

      {/* ===== Developer Info ===== */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
      >
        About the Developer
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        I’m <strong>Ahsan Ali</strong>, a passionate{" "}
        <strong>Full Stack Developer</strong> with a strong foundation in both
        frontend and backend technologies. My focus areas include{" "}
        <strong>
          React, TypeScript, .NET Core, and modern web architecture
        </strong>
        .
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.secondary, mb: 4 }}
      >
        Alongside web development, I have over{" "}
        <strong>5 years of experience in Unity 3D</strong>, working on gameplay
        design, physics systems, and interactive experiences. This background
        gives me a creative edge and deep understanding of how users interact
        with systems visually and logically.
      </Typography>

      <Divider sx={{ my: 5 }} />

      {/* ===== Skills ===== */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Skills & Expertise
      </Typography>
      <Grid container spacing={4}>
        {skills.map((group, index) => (
          <Grid key={index} sx={{ xs: 12, md: 6 }}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                height: "100%",
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                {group.category}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {group.items.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    sx={{
                      fontWeight: 500,
                      bgcolor: theme.palette.background.default,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 5 }} />

      {/* ===== Connect Section ===== */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Let’s Connect
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary, mb: 2 }}
        >
          Interested in collaborating or exploring opportunities?
        </Typography>
        <Link
          href="/contact"
          underline="hover"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Visit the Contact Page →
        </Link>
      </Box>
    </Container>
  );
};

export default AboutPage;
