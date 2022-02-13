import { createTheme } from "@mui/material/styles";
import Icon from "@mui/material/Icon";

const CustomTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "bold" },
          style: {
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            width: "50%"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "menu" },
          style: {
            fontWeight: "bold",
            color: "#f7b10a !important"
          }
        },
        {
          props: { variant: "syn" },
          style: {
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            width: "15rem"
            // border: "1px solid #f7b10a!important",
          }
        }
      ],
      defaultProps: {
        disableElevation: false,
        disableFocusRipple: true,
        disableRipple: true
      }
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "home" },
          style: {
            color: "#e0e0e0 !important",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            border: "1px solid #444",
            background: "rgba(41,41,41,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "syn" },
          style: {
            color: "#e0e0e0 !important",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            border: "1px solid #444",
            background: "rgba(41,41,41,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem",
            width: "75%",
            margin: "auto",
            textAlign: "left"
            // border: "1px solid #f7b10a!important",
          }
        }
      ],
      defaultProps: {}
    },
    MuiDrawer: {
      variants: [
        {
          props: { variant: "nav" },
          style: {
            backdropFilter: "blur(0.5px)"
          }
        }
      ],
      defaultProps: {}
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: "expand" },
          style: {
            color: "#e0e0e0 !important",
            margin: "0px !important"
          }
        }
      ],
      defaultProps: {
        disableElevation: false,
        disableFocusRipple: true,
        disableRipple: true
      }
    },
    MuiListItem: {
      variants: [
        {
          props: { variant: "nav" },
          style: {
            height: "3em",
            overflow: "hidden",
            marginBottom: "1em"
          }
        }
      ],
      defaultProps: {
        disableElevation: false,
        disableFocusRipple: true,
        disableRipple: true
      }
    },
    MuiListItemText: {
      variants: [
        {
          props: { variant: "nav" },
          style: {
            color: "#e0e0e0 !important"
          }
        }
      ],
      defaultProps: {
        disableElevation: false,
        disableFocusRipple: true,
        disableRipple: true
      }
    },
    MuiDrawerPaper: {
      variants: [
        {
          props: { variant: "nav" },
          style: {
            backgroundColor: "#222 !important"
          }
        }
      ],
      defaultProps: {
        disableElevation: false,
        disableFocusRipple: true,
        disableRipple: true
      }
    }
  }
});

export { CustomTheme };