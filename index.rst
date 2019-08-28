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

            <p>PyVista is used across Earth sciences and engineering disciplines. A diverse community
	    use PyVista to visualize data/models in 3D, generate publication-quality illustrations, automate analysis workflows, and build custom applications leveraging PyVista's 3D capabilities.</p>

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
                 </ol>
                 <div class="carousel-inner" role="listbox">
                   <div class="item active">
                     <img src="_static/demo/salt-dome.gif">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/volume-opacity.png">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/point-cloud.png">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/visible-cell-selection.gif">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/tunneling.png">
                     <div class="carousel-caption">
                     </div>
                   </div>
                   <div class="item">
                     <img src="_static/demo/volume-rendering.gif">
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
            <div class="col-sm-7 col-sm-push-5 front-block-text">

            <h2>Python</h2>

            At its core, PyVista is a pure Python library - However, its
            dependencies, namely the Visualization Toolkit (VTK) is in C++.
            By wrapping the VTK library's Python bindings into the PyVista
            suite, we have created a streamlined and intuitive toolset for
            3D Visualization and mesh analysis/processing.
            Since PyVista is purely Python and VTK has wheels deployed for most
            major platforms and Python versions, PyVista can be used across
            platforms - it is being used across UNIX and Windows platforms
            everyday!

            </div>
            <div class="col-sm-3 col-sm-pull-7">
                <img src="_static/python-logo.svg">
            </div>
        </div>
   </div>


   <div class="container-fluid front-block front-block-light front-updates">
        <div class="row" style="text-align:center">
           <h2>News</h2>

           <ul>
           <li>
              PyVista 0.22.1 is now available!
              Check out the <a href="https://github.com/pyvista/pyvista/releases">Release Notes</a>.
           </li>
           <li>
             The Journal of Open Source Software submission was published!
              <a href="cite/">See Citing for the details.</a>
           </li>
           <li>
           Bane was <a href="https://youtu.be/FRHMDy37MPc">interviewed on the <em>Undersampled Radio</em> podcast</a>.
           </li>
           </ul>
        </div>
   </div>

.. toctree::
   :hidden:

   about/index.rst
   documentation/index.rst
   cite/index.rst
