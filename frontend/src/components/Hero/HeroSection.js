import React from "react";
import { Grid, Typography } from "@mui/material";
import { Container, Content, GradientText, Section } from "./style";
import UploadReading from "../Upload/UploadReading";
import { theme, TopbarHeight } from "../../assets/global/Theme";
import { Box } from "@mui/system";

export default function HeroSection() {
  return (
    <Section>
      <Container maxWidth="lg">
        <Content container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box marginTop={`-${TopbarHeight * 2}px`}>
              <Typography
                component="h1"
                variant="h1"
                color={theme.palette.almond.main}
              >
                Intelligent automation for{" "}
                <GradientText>epilepsy diagnosis</GradientText>
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <UploadReading />
          </Grid>
        </Content>
      </Container>
    </Section>
  );
}
