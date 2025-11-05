import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  IconButton,
  Link,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Contact = () => {
  const theme = useTheme();

  const contactItems = [
    {
      label: "Email",
      icon: <EmailIcon fontSize="large" />,
      value: "ahsanashraf92@gmail.com",
      link: "mailto:ahsanashraf92@gmail.com",
    },
    {
      label: "Phone",
      icon: <PhoneIcon fontSize="large" />,
      value: "+92 300 1234567",
      link: "tel:+923001234567",
    },
    {
      label: "WhatsApp",
      icon: <WhatsAppIcon fontSize="large" />,
      value: "+92 300 1234567",
      link: "https://wa.me/923001234567",
    },
    {
      label: "GitHub",
      icon: <GitHubIcon fontSize="large" />,
      value: "github.com/ahsan-ashraf",
      link: "https://github.com/ahsan-ashraf",
    },
    {
      label: "LinkedIn",
      icon: <LinkedInIcon fontSize="large" />,
      value: "linkedin.com/in/ahsan-ali-3556001a2",
      link: "https://www.linkedin.com/in/ahsan-ali-3556001a2",
    },
  ];

  return (
    <Container sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          textAlign: "center",
          background: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: theme.palette.primary.main,
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 5,
            maxWidth: 600,
            mx: "auto",
          }}
        >
          I’d love to connect with you! Whether you have an opportunity,
          feedback, or just want to say hi — feel free to reach out through any
          of the platforms below.
        </Typography>

        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ maxWidth: 500, mx: "auto" }}
        >
          {contactItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  transform: "translateY(-3px)",
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <IconButton
                size="large"
                sx={{
                  color: theme.palette.primary.main,
                  mr: 2,
                }}
              >
                {item.icon}
              </IconButton>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.label}
                </Typography>
                <Link
                  href={item.link}
                  target="_blank"
                  underline="hover"
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.value}
                </Link>
              </Box>
            </Box>
          ))}
        </Stack>

        <Typography
          variant="body2"
          sx={{
            mt: 6,
            color: theme.palette.text.secondary,
          }}
        >
          © {new Date().getFullYear()} Ahsan Ali — All Rights Reserved
        </Typography>
      </Paper>
    </Container>
  );
};

export default Contact;
