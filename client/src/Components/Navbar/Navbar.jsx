import React, {useContext, Fragment} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Popover from "@material-ui/core/Popover";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import useStyles from './NavbarStyle';
import StarIcon from '@material-ui/icons/Star';
import Button from "@material-ui/core/Button";
import { AuthContext } from '../../Context/AuthContext';

const NavBar = (props) => {
  const { isAuthenticated } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  // Right Drop Downmenu Functionality
  const handleClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl2(null);
  };
  const open = Boolean(anchorEl2);
  const id = open ? "simple-popover" : undefined;
  // ========== End Right DropDown Menu ============
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/logout" className="disable-link colorLInk">
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {/* Right Dropdown Menu Button & Menu*/}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl2}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
          
            <MenuList>
              <Link to="/" className="disable-link colorLInk">
                <MenuItem>
                  <ListItemIcon>
                    <HomeIcon fontSize="medium" color={"primary"} />
                  </ListItemIcon>
                  <Typography variant="inherit">Home </Typography>
                </MenuItem>
                </Link>
                {isAuthenticated? 
                  <Link to="/favorites" className="disable-link colorLInk">
                <MenuItem>
                
                  <ListItemIcon>
                    <StarIcon fontSize="medium" color={"primary"} />
                  </ListItemIcon>
                  <Typography variant="inherit">Favorites </Typography>
                </MenuItem>
                </Link>
                : null
          }
            </MenuList>
          </Popover>
          <Typography className={classes.title} variant="h6" noWrap>
            News Online
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          {
            isAuthenticated?
          <div className={classes.sectionDesktop}>
          <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<HomeIcon />}
                
              >
                <Link  to="/" className="disable-link">
                Home</Link>
              </Button>
          <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<StarIcon />}
              >
                <Link to="/favorites" className="disable-link">Favorites</Link>
              </Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div> : null
        }

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {
        isAuthenticated? <Fragment>
      {renderMobileMenu}
      {renderMenu}
      </Fragment> : null
      }
    </div>
  );
};
export default NavBar;