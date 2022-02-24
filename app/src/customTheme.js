import { createTheme } from "@mui/material/styles";

const CustomTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "bold" },
          style: {
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            width: "50%"
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "home" },
          style: {
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            width: "50%",
            '&:hover': {
              backgroundColor: 'var(--colorSub)',
              color: '#fff',
            }
            // marginTop:"1em"
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "homeWide" },
          style: {
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            width: "100%",
            '&:hover': {
              backgroundColor: 'var(--colorSub)',
              color: '#fff',
            }
            // marginTop:"1em"
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "menu" },
          style: {
            fontWeight: "bold",
            color: "#fff !important",
            paddingLeft: "30px",
          }
        },
        {
          props: { variant: "syn" },
          style: {
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            width: "15rem"
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "arch" },
          style: {
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            width: "15rem",
            marginTop: "25px"
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "archEnterFullscreen" },
          style: {
            display: "grid",
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            marginRight: "auto",
            width: "50%",
            overflow: "hidden",
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "archExitFullscreen" },
          style: {
            fontWeight: "bold",
            // color: "var(--colorMain) !important",
            color: "#fff",
            // background: "linear-gradient(45deg, var(--colorMain) 30%, var(--colorSub) 90%)",
            background: "var(--buttonGradient)",
            width: "100%",
            margin: "auto",
            marginTop: "25px"
            // border: "1px solid var(--colorMain)!important",
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
            borderRadius: "7px",
            backdropFilter: "blur(2px)",
            // padding: "1rem 3rem",
            textAlign: "left"
            // border: "1px solid var(--colorMain)!important",
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
            // border: "1px solid var(--colorMain)!important",
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
            // border: "1px solid var(--colorMain)!important",
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
            // border: "1px solid var(--colorMain)!important",
          }
        },
        {
          props: { variant: "modal" },
          style: {
            color: "#e0e0e0 !important",
            border: "1px solid #444",
            background: "rgba(20,20,20,.8)!important",
            backdropFilter: "blur(2px)",
            padding: "1.5rem",
            height: "100%",
            width: "100%",
            margin: "auto",
            padding: "1em 3em",
            textAlign: "left"
            // border: "1px solid var(--colorMain)!important",
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
            // border: "1px solid var(--colorMain)!important",
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
        },
        {
          props: { variant: "delete" },
          style: {
            color: "#e0e0e0 !important",
            '&:hover': {
              backgroundColor: 'var(--colorMain) !important',
              color: '#121212 !important'
            }
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
            marginBottom: "1em",
            fontWeight: "bold",
            '&:hover': {
              backgroundColor: '#121212',
              color: '#fff',
              boxShadow: "0 2px var(--colorMain)"
            }
          }
        },
        {
          props: { variant: "navBottom" },
          style: {
            height: "3em",
            overflow: "hidden",
            marginBottom: "1em",
            fontWeight: "bold",
            position: "absolute",
            bottom: "0",
            marginTop: "100%",
            '&:hover': {
              backgroundColor: '#1a1a1a',
              color: '#fff',
              boxShadow: "0 2px var(--colorMain)"
            }
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
            width: "1.5em",
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