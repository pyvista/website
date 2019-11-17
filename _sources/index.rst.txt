.. pyvista-website documentation master file, created by
   sphinx-quickstart on Thu Aug  1 17:04:22 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. title:: The PyVista Project

.. raw:: html

    <div class="container">
        <img class="front-logo" src="_static/pyvista-banner.png">
    </div>

    <div class="container-fluid front-block front-block-dark front-updates">
         <div class="row" style="text-align:center">
         Our goal is to make 3D visualization and analysis approachable to domain-scientists so they
         can focus on the research questions at hand.
         </div>
    </div>

   <div class="container-fluid front-block front-block-light">
        <div class="row">
            <div class="col-sm-7 front-block-text">

            <h2>A Domain Agnostic Visualization and Analysis Toolkit</h2>

            <p>PyVista is used across science and engineering disciplines.
            A diverse community use PyVista to visualize data/models in 3D,
            generate publication-quality illustrations, automate analysis
            workflows, and build custom applications leveraging PyVista's 3D
            capabilities.</p>

        <p>New to programming? Welcome! Many of PyVista's users are novice programmers
        and we've designed PyVista to be intuitive and ready for beginners to get started
        making compelling visualizations of spatial data.</p>

            </div>
            <div class="col-sm-5">
               <div id="carousel-example-generic" class="carousel slide" data-ride="carousel" data-interval="5000">
                 <ol class="carousel-indicators">
                   <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="5"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="6"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="7"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="8"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="9"></li>
                   <li data-target="#carousel-example-generic" data-slide-to="10"></li>
                 </ol>
                 <div class="carousel-inner" role="listbox">
                   <div class="item active">
                     <img src="_static/demo/salt-dome.gif">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/volume-opacity.png" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/tornado.jpeg" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/omfvista.gif" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/sphere-widget-c.gif" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/point-cloud.png" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/visible-cell-selection.gif" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/slider-widget-threshold.gif" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/tunneling.png" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/volume-rendering.gif" height="75%">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/line-widget-streamlines.gif">
                     <div class="carousel-caption">
                     </div>
                   </div>
                 </div>
                 <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                   <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                   <span class="sr-only">Previous</span>
                 </a>
                 <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                   <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                   <span class="sr-only">Next</span>
                 </a>
               </div>
            </div>
        </div>
   </div>

   <div class="container-fluid front-block front-block-dark">
        <div class="row">

            <h2>About</h2>

            The PyVista project is a collection of Free Licensed Open Source Software
            (FLOSS) around 3D visualization and mesh analysis in Python.
            The flagship <a href="https://github.com/pyvista/pyvista">PyVista</a>
            library provides the core 3D plotting and mesh types used across the PyVista
            project.
            <br/>
            <br/>
            At its core, PyVista is a pure Python library - However, its
            dependencies, namely the Visualization Toolkit (VTK) is in C++.
            By wrapping the VTK library's Python bindings into the PyVista
            suite, we have created a streamlined and intuitive toolset for
            3D Visualization and mesh analysis/processing.
            Since PyVista is purely Python and VTK has wheels deployed for most
            major platforms and Python versions, PyVista can be used across
            platforms - it is being used across UNIX and Windows platforms
            everyday!
            <br/>
            <br/>
            PyVista is built on top of the <a href="http://wwww.vtk.org">Visualization Toolkit (VTK)</a>
            directly inheriting VTK mesh types and wrapping a layer of functionality on
            top of those types to make creation and analysis of those data structures
            simple and intuitive. This all means that PyVista is immediately interoperable
            with *any* VTK-based software - which is a part of our mission to break down
            the barrier to entry for 3D visualization across the sciences.


        </div>
   </div>


   <div class="container-fluid front-block front-block-light">
        <div class="row">

        <h2>Creators</h2>

        We are an open source community - <a href="https://github.com/pyvista/pyvista/blob/master/AUTHORS.rst">our developers</a>
        come from a wide breadth of backgrounds ranging from computational geophysics
        to aeronautical engineering. Our diverse team of developers is what makes
        PyVista successful and able to be used across disciplines.

        </div>
   </div>



.. toctree::
   :hidden:

   projects/index.rst
   cite/index.rst
