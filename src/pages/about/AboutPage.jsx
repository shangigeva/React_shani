import React from "react";
import Box from "@mui/system/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { List, ListItem } from "@mui/material";
const AboutPage = () => {
  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "auto",
        padding: 4,
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <img
        src="/assets/imgs/logo.png"
        alt="Profile"
        style={{
          width: "150px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      />

      <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
        About me
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "0.8rem" }}>
        Hi there! I'm Shani, I'm 23 years old from Nes Ziona, Israel. A Full
        Stack Developer, specializing in JavaScript and React.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2, fontSize: "0.8rem" }}>
        I acquired my knowledge and skills at HackerU College, where I honed my
        programming abilities and gained hands-on experience in web development.
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
          Services
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: 1, fontSize: "0.8rem" }}
        >
          I offer a range of services and expertise in JavaScript and React
          development. Whether you need assistance with front-end design,
          back-end functionality, or full-stack projects, I'm here to help!
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: "#9BBEC8" }}>
          My Cards
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: 1, fontSize: "0.8rem" }}
        >
          Browse through the collection of business cards created by users.
          Business users can create cards, and others can view and add them to
          their favorites.
        </Typography>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2, color: "#9BBEC8" }}>
          Create Card
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: 1, fontSize: "0.8rem" }}
        >
          Business users can create their business cards, providing detailed
          information about their services, contact details, and more.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginTop: 2, textAlign: "center", maxWidth: "800px" }}>
          <Typography variant="h3" sx={{ marginBottom: 2, color: "#427D9D" }}>
            Contact information
          </Typography>
          <List>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 1,
                fontSize: "0.8rem",
              }}
            >
              <EmailIcon sx={{ marginRight: 1 }} />
              <Link href="mailto:shanig7@gmail.com">shanig7@gmail.com</Link>
            </ListItem>
            <ListItem
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 1,
                fontSize: "0.8rem",
              }}
            >
              <PhoneAndroidIcon sx={{ marginRight: 1 }} />
              054-465-5700
            </ListItem>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <FmdGoodIcon sx={{ marginRight: 1, fontSize: "0.8rem" }} />
              23 Haim Bar Lev St., Nes Ziona
            </ListItem>
          </List>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ marginTop: 4, fontSize: "0.8rem" }}>
        Feel free to reach out if you have any questions, need assistance, or
        want to discuss a potential collaboration. I'm excited to contribute to
        your projects and help bring your ideas to life!
      </Typography>
    </Box>
  );
};

export default AboutPage;
