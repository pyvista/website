# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# http://www.sphinx-doc.org/en/master/config
import datetime
import sphinx_bootstrap_theme

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------
year = datetime.date.today().year
project = 'PyVista'
copyright = '{:d}, PyVista Developers'.format(year)
author = 'PyVista Developers'

# The full version, including alpha/beta/rc tags
release = '0.0.0'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
]

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.

html_title = project
html_short_title = ""
# html_logo = "_static/gmt-logo.png"
# html_favicon = "_static/favicon.png"
html_extra_path = [".nojekyll", "CNAME", "team.html"]
html_use_smartypants = True
pygments_style = "default"
html_add_permalinks = ""

# Theme config
html_theme = "bootstrap"
html_theme_path = sphinx_bootstrap_theme.get_html_theme_path()
html_theme_options = {
    "bootswatch_theme": "flatly",
    "navbar_title": "",
    "navbar_site_name": "Site",
    "navbar_links": [
        ("Home", "/", True),
        ("About", "about/", True),
        # ("Download", "download/", True),
        ("Documentation", "documentation/", True),
        # ("Workshops", "workshops/", True),
        ("Citing", "cite/", True),
    ],
    # Render the next and previous page links in navbar. (Default: true)
    "navbar_sidebarrel": False,
    # Render the current pages TOC in the navbar. (Default: true)
    "navbar_pagenav": False,
    # Tab name for the current pages TOC. (Default: "Page")
    "navbar_pagenav_name": "This page",
    # Global TOC depth for "site" navbar tab. (Default: 1)
    # Switching to -1 shows all levels.
    "globaltoc_depth": 1,
    # Include hidden TOCs in Site navbar?
    # Note: If this is "false", you cannot have mixed ``:hidden:`` and
    # non-hidden ``toctree`` directives in the same page, or else the build
    # will break.
    # Values: "true" (default) or "false"
    "globaltoc_includehidden": "false",
    # HTML navbar class (Default: "navbar") to attach to <div> element.
    # For black navbar, do "navbar navbar-inverse"
    "navbar_class": "navbar navbar-default",
    # Fix navigation bar to top of page?
    # Values: "true" (default) or "false"
    "navbar_fixed_top": "false",
    # Location of link to source.
    # Options are "nav" (default), "footer" or anything else to exclude.
    "source_link_position": "footer",
    "bootstrap_version": "3",
}
html_context = {
    "social_links": [
        (
            '<i class="fab fa-github fa-lg"></i>',
            "GitHub",
            "https://github.com/pyvista",
        ),
        (
            '<i class="fab fa-slack fa-lg"></i>',
            "Slack chat",
            "https://slack.pyvista.org",
        ),
    ],
    "url": "https://www.pyvista.org",
    "last_updated": str(datetime.date.today()),
    "repository": "pyvista/website",
}

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']



# Load the custom CSS files (needs sphinx >= 1.6 for this to work)
def setup(app):
    app.add_stylesheet("style.css")
    app.add_stylesheet("fontawesome/css/all.css")
