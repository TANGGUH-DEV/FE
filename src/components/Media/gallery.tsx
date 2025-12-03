import React, { useState } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
  CircularProgress,
  Box,
  Dialog,
  IconButton,
  Typography,

} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Close as CloseIcon } from "@mui/icons-material";



interface MediaItem {
  id: string;
  url: string;
  title: string;
  category: string;
  deskripsi: string;
  type: "image" | "video";
}

interface MediaProps {
  data: MediaItem[];
  isLoading: boolean;
}

export const Gallery: React.FC <MediaProps> = ({data, isLoading}) => {

  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const cols = isSmall ? 2 : isMedium ? 3 : 4;


  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <ImageList
        variant="masonry"
        cols={cols}
        gap={12}
        sx={{
          mt: 4,
          p: 1,
          overflowY: "hidden",
          "& img, & video": {
            borderRadius: "12px",
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.03)",
              zIndex: 2,
            },
          },
        }}
      >
        {data.map((item) => (
          <ImageListItem key={item.id} onClick={() => setSelectedItem(item)}>
            {item.type === "video" ? (
              <video
                src={item.url}
                preload="metadata"
                playsInline
                style={{ maxHeight: "500px" }}
              />
            ) : (
              <img
                src={item.url}
                alt={item.title}
                loading="lazy"
                style={{ maxHeight: "500px" }}
              />
            )}
            <ImageListItemBar
              title={item.title}
              subtitle={item.deskripsi}
              position="below"
              sx={{
                textAlign: "center",
                mt: 1,
                "& .MuiImageListItemBar-title": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {/* Fullscreen Dialog */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        fullScreen
        PaperProps={{
          sx: { bgcolor: "black", color: "white", position: "relative" },
        }}
      >
        {selectedItem && (
          <>
            <IconButton
              onClick={() => setSelectedItem(null)}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "white",
                bgcolor: "rgba(27, 44, 227, 0.4)",
                "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                p: 2,
              }}
            >
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "90vh",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "90vh",
                    objectFit: "contain",
                  }}
                />
              )}
            </Box>

            <Box sx={{ textAlign: "center", p: 2, bgcolor: "black" }}>
              <Typography variant="h5">{selectedItem.title}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {selectedItem.deskripsi}
              </Typography>
            </Box>
          </>
        )}
      </Dialog>
    </>
  );
};
