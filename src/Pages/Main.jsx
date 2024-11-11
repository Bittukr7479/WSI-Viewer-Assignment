import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Stack, Switch, Divider, IconButton, useMediaQuery } from "@mui/material";
import OpenSeadragon from "openseadragon";
import Wsi from "../Assetes/wsi.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WestIcon from '@mui/icons-material/West';

const findingsData = {
  RBC: [
    { name: "Angled Cells", count: 222, percentage: "67%" },
    { name: "Borderline Ovalocytes", count: 50, percentage: "20%" },
    { name: "Burr Cells", count: 87, percentage: "34%" },
    { name: "Fragmented Cells", count: 2, percentage: "0.12%" },
    { name: "Ovalocytes", count: 0, percentage: "" },
    { name: "Rounded RBC", count: 0, percentage: "" },
    { name: "Teardrops", count: 0, percentage: "" },
  ],
  WBC: [
    { name: "Basophil", count: 222, percentage: "67%" },
    { name: "Eosinophil", count: 50, percentage: "20%" },
    { name: "Lymphocyte", count: 87, percentage: "34%" },
    { name: "Monocyte", count: 2, percentage: "0.12%" },
  ],
  Platelets: { count: 222, percentage: "222%" },
};

const patientInfo = {
  id: "P123456789",
  name: "John Doe",
  bloodType: "O+"
};

const WSIViewer = () => {
  const viewerRef = useRef(null);
  const [viewportCenter, setViewportCenter] = useState({ x: 0.5, y: 0.5 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#f5f5f5',
      },
      action: {
        hover: isDarkMode ? '#333' : '#f5f5f5',
      },
      headerColor: isDarkMode ? "#333" : "#e0f7fa",
      border: isDarkMode ? '2px solid #1976d2': '2px solid transparent'
    },
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const viewer = OpenSeadragon({
      element: viewerRef.current,
      prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
      tileSources: {
        type: "image",
        url: Wsi,
      },
    });

    viewer.addHandler("viewport-change", () => {
      const center = viewer.viewport.getCenter();
      setViewportCenter({ x: center.x, y: center.y });
    });

    return () => viewer.destroy();
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ position: 'relative', backgroundColor: theme.palette.default }}>
        <Typography
          textAlign="center"
          variant="h5"
          fontWeight="600"
          style={{paddingRight: isMobile? '65px': 'unset'}}
          sx={{
            padding: 2,
            bgcolor: isDarkMode ? 'background.paper' : 'background.default',
            color: isDarkMode ? 'text.primary' : 'text.secondary',
          }}
        >
          Mon Oct 07 2024 16:39:07
        </Typography>

        <Box sx={{ position: 'absolute', bottom: 20, right: 20, marginRight: isMobile? '-18px': '0px'}}>
          <Switch
            checked={isDarkMode}
            onChange={handleThemeToggle}
            inputProps={{ 'aria-label': 'Dark Mode Toggle' }}
          />
        </Box>

        <Divider sx={{ bgcolor: isDarkMode ? 'text.primary' : 'divider' }} />
      </Box>

      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} bgcolor="background.default" >
        <Box
          width={isMobile ? 'unset' : '25%'}
          ml={3}
          p={isMobile ? 1 : 2}
        >
          <Box ml={-2} display={"flex"}>
            <IconButton>
              <WestIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box p={2} bgcolor="transparent" borderRadius={'9px'} boxShadow={2} border={theme.palette.border}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.headerColor }}>
                    <TableCell>RBC</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {findingsData.RBC.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.headerColor }}>
                    <TableCell>WBC</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {findingsData.WBC.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>{item.percentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: theme.palette.headerColor }}>
                    <TableCell>Count</TableCell>
                    <TableCell>Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <TableCell>{findingsData.Platelets.count}</TableCell>
                    <TableCell>{findingsData.Platelets.percentage}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box
          flexGrow={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={2}
        >
          <Box
            ref={viewerRef}
            width="100%"
            height={isMobile ? '300px' : '500px'}
            bgcolor="#e0e0e0"
            boxShadow={2}
          />
        </Box>

        <Box
          width={isMobile ? 'unset' : '20%'}
          p={2}
          bgcolor="transparent"
          boxShadow={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          borderRadius={'9px'}
          border={theme.palette.border}
          m={1}
          height={'80%'}
        >
          <Stack gap="25px">
            <Paper elevation={3} sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box
                component="img"
                src={Wsi}
                alt="Zoomed-Out View"
                sx={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: `${viewportCenter.y * 100}%`,
                  left: `${viewportCenter.x * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              />
            </Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2} align="center" sx={{ backgroundColor: theme.palette.headerColor }}>
                    Patient Information
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Patient ID:</TableCell>
                  <TableCell>{patientInfo.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Patient Name:</TableCell>
                  <TableCell>{patientInfo.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Blood Group:</TableCell>
                  <TableCell>{patientInfo.bloodType}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
          <Button variant="contained" sx={{ mt: 2}} color="primary" width="50%">
            Generate Report
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default WSIViewer;
