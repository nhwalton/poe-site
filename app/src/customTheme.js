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
          props: { variant: "home" },
          style: {
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            width: "50%",
            '&:hover': {
              backgroundColor: '#f39521',
              color: '#fff',
            }
            // marginTop:"1em"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "homeWide" },
          style: {
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            width: "100%",
            '&:hover': {
              backgroundColor: '#f39521',
              color: '#fff',
            }
            // marginTop:"1em"
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
        },
        {
          props: { variant: "arch" },
          style: {
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            width: "15rem",
            marginTop: "25px"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "archEnterFullscreen" },
          style: {
            display: "grid",
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            marginRight: "auto",
            width: "50%",
            overflow: "hidden",
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "archExitFullscreen" },
          style: {
            fontWeight: "bold",
            // color: "#f7b10a !important",
            color: "#fff",
            background: "linear-gradient(45deg, #f7b10a 30%, #f39521 90%)",
            width: "100%",
            margin: "auto",
            marginTop: "25px"
            // border: "1px solid #f7b10a!important",
          }
        }
      ],
      defaultProps: {
        // disableElevation: false,
        // disableFocusRipple: true,
        // disableRipple: true
      }
    },
    MuiCard: {
      variants: [
        {
          props: { variant: "home" },
          style: {
            color: "#d1d1d1 !important",
            border: "1px solid #2e2e2e",
            background: "rgba(24, 24, 24,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1rem 3rem",
            textAlign: "left"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "syn" },
          style: {
            color: "#e0e0e0 !important",
            border: "1px solid #444",
            background: "rgba(41,41,41,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem",
            width: "75%",
            margin: "auto",
            textAlign: "left"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "synNarrow" },
          style: {
            color: "#e0e0e0 !important",
            border: "1px solid #444",
            background: "rgba(41,41,41,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem",
            width: "calc(100vw - 40px)",
            // width: "95%",
            margin: "auto",
            textAlign: "left"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "arch" },
          style: {
            color: "#e0e0e0 !important",
            border: "1px solid #444",
            background: "rgba(20,20,20,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem",
            width: "75%",
            margin: "auto",
            marginTop: "25px",
            textAlign: "left"
            // border: "1px solid #f7b10a!important",
          }
        },
        {
          props: { variant: "archFullscreen" },
          style: {
            color: "#e0e0e0 !important",
            border: "1px solid #444",
            background: "rgba(20,20,20,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem",
            width: "75%",
            margin: "auto",
            marginTop: "25px",
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
        // disableElevation: false,
        // disableFocusRipple: true,
        // disableRipple: true
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
        // disableElevation: false,
        // disableFocusRipple: true,
        // disableRipple: true
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
        // disableElevation: false,
        // disableFocusRipple: true,
        // disableRipple: true
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
        // disableElevation: false,
        // disableFocusRipple: true,
        // disableRipple: true
      }
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { variant: "hamburger" },
          style: {
            width: "2em",
            marginTop: "-0.2em"
          }
        }
      ],
      defaultProps: {
        // disableElevation: false,
        // disableFocusRipple: true,
        // disableRipple: true
      }
    }
  }
});

export { CustomTheme };