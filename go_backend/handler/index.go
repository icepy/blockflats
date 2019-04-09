package handler

import (
	"github.com/labstack/echo"
	"net/http"
)

const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize"
const GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
const GITHUB_USER_URL = "https://api.github.com/user"
const GITHUB_STARS_URL = "https://api.github.com/user/starred"


const GITHUB_CLIENT_ID = ""
const GITHUB_CLIENT_SECRET = ""

func RedirectOAuthPage(c echo.Context) error{
	return c.Redirect(http.StatusFound, GITHUB_OAUTH_URL + "?client_id=" + GITHUB_CLIENT_ID)
}
