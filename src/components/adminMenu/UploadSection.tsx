import React from "react";
import { Box, Typography, Button } from "@mui/material";

export const UploadSection: React.FC = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Upload File
      </Typography>
      <Typography variant="body1" mb={2}>
        Unggah dokumen atau gambar untuk sistem admin.
      </Typography>

      <Button variant="contained" component="label">
        Pilih File
        <input type="file" hidden />
      </Button>
    </Box>
  );
};
