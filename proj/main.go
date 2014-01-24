package main

import (
	"github.com/codegangsta/martini"
	"github.com/codegangsta/martini-contrib/render"
)

func index(r render.Render) {
	r.HTML(200, "index", nil)
}

func initMartini() *martini.ClassicMartini {
	m := martini.Classic()
	m.Use(render.Renderer())
	m.Get("/", index)
	return m
}

func main() {
	m := initMartini()
	m.Run()
}
