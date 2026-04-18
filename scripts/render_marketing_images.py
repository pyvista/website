"""Render marketing screenshots and animations for the PyVista website.

Run with ``npm run render:screenshots`` (or ``uv run ...`` directly) from the
repo root. Outputs are written to ``public/images`` as themed ``-light``/``-dark``
JPEG and GIF pairs consumed by ``src/data/site.ts``.
"""

from __future__ import annotations

from dataclasses import dataclass
from io import BytesIO
from pathlib import Path

import cairosvg
import numpy as np
import pyvista as pv
from PIL import Image, ImageSequence
from pyvista import examples

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / 'public'
OUTPUT_DIR = PUBLIC_DIR / 'images'
WINDOW_SIZE = (1800, 1200)
# Open Graph / Twitter card spec: 1200x630 = 1.91:1.
OG_WINDOW_SIZE = (1200, 630)
JPEG_QUALITY = 86

# GIF compression settings. GIFs are shown at card size (~600 px wide) so
# downscaling the plotter output before palette quantization is the single
# biggest lever for file size. A shared adaptive palette across frames lets
# Pillow's inter-frame optimization dedupe unchanged pixels, and disabling
# dither avoids noise that would defeat GIF's run-length compression.
GIF_MAX_WIDTH = 720
GIF_PALETTE_COLORS = 64


@dataclass(frozen=True)
class RenderTheme:
    """Visual settings for a themed render pass."""

    name: str
    background: str
    surface_background: str
    ghost_color: str


RENDER_THEMES = (
    RenderTheme(
        name='dark',
        background='#07080a',
        surface_background='#131418',
        ghost_color='white',
    ),
    RenderTheme(
        name='light',
        background='#fbfbfd',
        surface_background='#ffffff',
        ghost_color='#05080d',
    ),
)


def configure_theme() -> None:
    """Configure PyVista defaults for clean marketing screenshots."""
    pv.set_plot_theme('document')
    pv.global_theme.axes.show = False
    pv.global_theme.show_scalar_bar = False
    pv.global_theme.smooth_shading = True


def themed_filename(base_name: str, theme: RenderTheme, extension: str) -> str:
    """Return the output filename for a themed asset."""
    return f'{base_name}-{theme.name}.{extension}'


def new_plotter(*, background: str) -> pv.Plotter:
    """Create an off-screen plotter with consistent styling."""
    plotter = pv.Plotter(off_screen=True, window_size=WINDOW_SIZE)
    plotter.set_background(background)
    plotter.enable_anti_aliasing('msaa')
    return plotter


def save_screenshot(plotter: pv.Plotter, base_name: str, theme: RenderTheme) -> None:
    """Save a screenshot as an optimized progressive JPEG and close the plotter."""
    output_path = OUTPUT_DIR / themed_filename(base_name, theme, 'jpg')
    output_path.parent.mkdir(parents=True, exist_ok=True)
    image = plotter.screenshot(return_img=True)
    Image.fromarray(image).convert('RGB').save(
        output_path,
        format='JPEG',
        quality=JPEG_QUALITY,
        optimize=True,
        progressive=True,
    )
    plotter.close()
    print(f'Saved {output_path.relative_to(ROOT)}')


def optimize_gif(
    path: Path,
    *,
    max_width: int = GIF_MAX_WIDTH,
    palette_colors: int = GIF_PALETTE_COLORS,
    dither: Image.Dither = Image.Dither.NONE,
) -> None:
    """Re-save a GIF in place: downscale, quantize to a shared palette, and optimize.

    This replaces the large, true-color frames that ``plotter.open_gif`` writes
    with a compact palette-indexed animation suitable for the website. The
    palette is sampled across *all* frames (not just frame zero) so smooth
    colormapped renders keep their gradients, and ``dither`` can be raised to
    ``FLOYDSTEINBERG`` for gradient-heavy animations where banding shows.
    """
    with Image.open(path) as source:
        rgb_frames = [frame.copy().convert('RGB') for frame in ImageSequence.Iterator(source)]
        durations = [frame.info.get('duration', 100) for frame in rgb_frames]
        loop = source.info.get('loop', 0)

    first = rgb_frames[0]
    if first.width > max_width:
        scale = max_width / first.width
        new_size = (max_width, round(first.height * scale))
        rgb_frames = [frame.resize(new_size, Image.Resampling.LANCZOS) for frame in rgb_frames]
        first = rgb_frames[0]

    # Build one adaptive palette that covers every frame by stitching a strip
    # of all frames and quantizing that, so the master palette spans the full
    # animation's color range instead of only frame zero.
    strip = Image.new('RGB', (first.width, first.height * len(rgb_frames)))
    for index, frame in enumerate(rgb_frames):
        strip.paste(frame, (0, index * first.height))
    master = strip.quantize(colors=palette_colors, method=Image.Quantize.MEDIANCUT)

    palette_frames = [frame.quantize(palette=master, dither=dither) for frame in rgb_frames]

    palette_frames[0].save(
        path,
        save_all=True,
        append_images=palette_frames[1:],
        duration=durations,
        loop=loop,
        optimize=True,
        disposal=2,
    )
    size_kb = path.stat().st_size / 1024
    print(f'  optimized {path.name} -> {size_kb:.0f} KB')


def render_volume_rendering(theme: RenderTheme) -> None:
    """Render the ``crop_labeled`` volume rendering used in the hero."""
    dataset = examples.download_whole_body_ct_male()
    ct = dataset['ct']
    skull = dataset['segmentations']['skull']
    cropped_ct = ct.crop(mask=skull, padding=10).points_to_cells()
    skull_surface = skull.contour_labels()
    cmap = 'bone' if theme.name == 'dark' else 'viridis'

    plotter = new_plotter(background=theme.surface_background)
    plotter.add_mesh(skull_surface, color='white')
    plotter.add_volume(cropped_ct, cmap=cmap, opacity_unit_distance=10, show_scalar_bar=False)
    plotter.camera_position = pv.CameraPosition(
        position=(687.5, 763.6, 471.3),
        focal_point=(231.8, 296.3, 677.0),
        viewup=(0.107, 0.311, 0.944),
    )
    plotter.camera.zoom(1.08)
    save_screenshot(plotter, 'hero-volume-rendering', theme)


def render_gltf(theme: RenderTheme) -> None:
    """Render the glTF import example."""
    helmet_file = examples.gltf.download_damaged_helmet()
    environment = examples.download_dikhololo_night()

    plotter = new_plotter(background=theme.surface_background)
    plotter.import_gltf(helmet_file)
    plotter.set_environment_texture(environment)
    plotter.camera.zoom(1.7)
    save_screenshot(plotter, 'hero-gltf', theme)


def render_pbr(theme: RenderTheme) -> None:
    """Render the physically based rendering example."""
    mesh = examples.download_nefertiti()
    mesh.rotate_x(-90.0, inplace=True)
    cubemap = examples.download_sky_box_cube_map()

    plotter = new_plotter(background=theme.surface_background)
    plotter.set_environment_texture(cubemap)
    plotter.add_mesh(
        mesh,
        color='salmon' if theme.name == 'dark' else 'linen',
        pbr=True,
        metallic=0.8,
        roughness=0.1,
        diffuse=1.0,
        show_scalar_bar=False,
    )
    plotter.camera_position = pv.CameraPosition(
        position=(-313.40, 66.09, 1000.61),
        focal_point=(0.0, 0.0, 0.0),
        viewup=(0.018, 0.99, -0.06),
    )
    save_screenshot(plotter, 'hero-pbr', theme)


def render_pump_bracket(theme: RenderTheme) -> None:
    """Render the animated pump bracket modal analysis."""
    dataset = examples.download_pump_bracket()
    mode_shape = 'disp_6'
    scalar_name = 'disp_6_magnitude'
    mode_values = np.linalg.norm(dataset[mode_shape], axis=1)
    scalar_limit = float(mode_values.max()) * 0.05
    cmap = 'coolwarm_r' if theme.name == 'dark' else 'coolwarm'

    plotter = new_plotter(background=theme.surface_background)
    plotter.camera_position = pv.CameraPosition(
        position=(0.744, -0.502, -0.830),
        focal_point=(0.0520, -0.160, 0.0743),
        viewup=(-0.180, -0.958, 0.224),
    )
    output_path = OUTPUT_DIR / themed_filename('example-pump-bracket', theme, 'gif')
    output_path.parent.mkdir(parents=True, exist_ok=True)

    plotter.open_gif(str(output_path))
    animated_actor = None
    for phase in np.linspace(0, 2 * np.pi, 40, endpoint=False):
        scale = float(np.cos(phase)) * 0.05
        warped = dataset.warp_by_vector(mode_shape, factor=scale)
        warped[scalar_name] = mode_values * scale

        if animated_actor is not None:
            plotter.remove_actor(animated_actor, render=False)

        animated_actor = plotter.add_mesh(
            warped,
            scalars=scalar_name,
            cmap=cmap,
            clim=(-scalar_limit, scalar_limit),
            ambient=0.22,
            specular=0.1,
            smooth_shading=True,
            show_scalar_bar=False,
            render=False,
        )
        plotter.write_frame()

    plotter.close()
    # Full-surface coolwarm gradient: needs more palette headroom and dither
    # to avoid banding on the shell.
    optimize_gif(output_path, palette_colors=160, dither=Image.Dither.FLOYDSTEINBERG)
    print(f'Saved {output_path.relative_to(ROOT)}')


def render_aero_bracket(theme: RenderTheme) -> None:
    """Render the static aero bracket FEA result shown beside the code snippet."""
    mesh = examples.download_aero_bracket()
    scalar_name = 'von Mises stress'
    cmap = 'turbo' if theme.name == 'dark' else 'cividis'

    plotter = new_plotter(background=theme.surface_background)
    plotter.add_mesh(
        mesh,
        scalars=scalar_name,
        cmap=cmap,
        ambient=0.2,
        specular=0.08,
        smooth_shading=True,
        show_scalar_bar=False,
    )
    plotter.camera_position = pv.CameraPosition(
        position=(-0.058710313208299225, 0.07829398799776977, -0.14933554998422768),
        focal_point=(0.05113274858287714, 0.025970942494490966, 0.00015442292995795004),
        viewup=(0.11763873344828556, 0.9610857113861928, 0.24995076267532973),
    )
    plotter.camera.zoom(0.94)
    save_screenshot(plotter, 'example-aero-bracket', theme)


def render_cfd_data(theme: RenderTheme) -> None:
    """Render an animated CFD volume with pulsing streamtubes."""
    block = examples.download_openfoam_tubes()
    air = block[0]
    inlet = block[1][2]
    cmap = 'turbo' if theme.name == 'dark' else 'cividis'

    pset = pv.PointSet(inlet.points[::20])
    lines = air.streamlines_from_source(pset, vectors='U', max_length=1.0).compute_arc_length()
    segments = lines.extract_all_edges()
    pulse_coords = segments['arc_length'] / float(segments['arc_length'].max())

    bounds = np.array(air.bounds) * 1.15
    origin = (bounds[0], bounds[2], bounds[4])
    spacing = (0.004, 0.004, 0.004)
    dimensions = (
        int((bounds[1] - bounds[0]) // spacing[0] + 2),
        int((bounds[3] - bounds[2]) // spacing[1] + 2),
        int((bounds[5] - bounds[4]) // spacing[2] + 2),
    )
    grid = pv.ImageData(dimensions=dimensions, spacing=spacing, origin=origin).sample(air)

    plotter = new_plotter(background=theme.surface_background)
    plotter.add_volume(
        grid,
        scalars='nut',
        cmap=cmap,
        opacity=[0.0, 0.01, 0.1, 0.24, 0.48, 0.82],
        shade=True,
        ambient=0.15,
        diffuse=0.75,
        specular=0.1,
        show_scalar_bar=False,
    )
    plotter.add_mesh(air, color=theme.ghost_color, opacity=0.08 if theme.name == 'dark' else 0.06)
    plotter.add_mesh(
        lines,
        color=theme.ghost_color,
        opacity=0.16 if theme.name == 'dark' else 0.12,
        line_width=3,
        render_lines_as_tubes=False,
    )
    plotter.camera_position = pv.CameraPosition(
        position=(0.20447216056774437, -0.3012964924120598, 0.11241897699751509),
        focal_point=(0.01550985857779253, 0.01036811245508765, 0.08152853609703088),
        viewup=(-0.04378355596629003, 0.07221432278401245, 0.9964276651176408),
    )
    plotter.camera.zoom(1.12)

    output_path = OUTPUT_DIR / themed_filename('example-cfd-data', theme, 'gif')
    output_path.parent.mkdir(parents=True, exist_ok=True)

    plotter.open_gif(str(output_path))
    pulse_actor = None
    for phase in np.linspace(0.0, 1.0, 28, endpoint=False):
        distance = np.abs((pulse_coords - phase + 0.5) % 1.0 - 0.5)
        segments['pulse'] = np.exp(-((distance / 0.055) ** 2))
        active_lines = segments.threshold(value=(0.55, 1.0), scalars='pulse').extract_surface(
            algorithm=None
        )
        active_tubes = active_lines.tube(radius=0.0017)

        if pulse_actor is not None:
            plotter.remove_actor(pulse_actor, render=False)

        pulse_actor = plotter.add_mesh(
            active_tubes,
            scalars='pulse',
            cmap=cmap,
            clim=(0.55, 1.0),
            smooth_shading=True,
            show_scalar_bar=False,
            render=False,
        )
        plotter.write_frame()

    plotter.close()
    # Volume render + pulsing tubes sit on a smooth dark gradient; give the
    # palette more headroom and dither to keep the streamtubes readable.
    optimize_gif(output_path, palette_colors=144, dither=Image.Dither.FLOYDSTEINBERG)
    print(f'Saved {output_path.relative_to(ROOT)}')


def _rasterize_svg(path: Path, *, width: int) -> Image.Image:
    """Rasterize an SVG file to a transparent PIL image at the given width."""
    png_bytes = cairosvg.svg2png(url=str(path), output_width=width)
    return Image.open(BytesIO(png_bytes)).convert('RGBA')


def render_og_image() -> None:
    """Render the 1200x630 social share banner used as the OpenGraph image.

    Uses the light-themed PBR Nefertiti scene, offset to the right via the
    camera's window center, and composites the PyVista wordmark (rasterized
    from ``public/branding/pyvista.svg``) and a tagline on top. Text is drawn
    by VTK's built-in Arial font for a cleaner look than PIL's bundled fonts.
    """
    mesh = examples.download_nefertiti()
    mesh.rotate_x(-90.0, inplace=True)
    cubemap = examples.download_sky_box_cube_map()

    plotter = pv.Plotter(off_screen=True, window_size=OG_WINDOW_SIZE)
    # Matches the light-mode site background (``--surface-soft`` with a tint
    # of ``--accent-soft`` mixed in) so the card blends with the landing page.
    plotter.set_background('#f4f6fa')
    plotter.enable_anti_aliasing('msaa')
    plotter.set_environment_texture(cubemap)
    plotter.add_mesh(
        mesh,
        color='salmon',
        pbr=True,
        metallic=0.8,
        roughness=0.1,
        diffuse=1.0,
        show_scalar_bar=False,
    )
    plotter.camera_position = pv.CameraPosition(
        position=(-313.40, 66.09, 1000.61),
        focal_point=(0.0, 0.0, 0.0),
        viewup=(0.018, 0.99, -0.06),
    )
    # Shift the projection so the subject sits in the right portion of the
    # canvas, leaving the left clear for the wordmark and tagline. Negative
    # x on ``SetWindowCenter`` translates the image to the right.
    plotter.camera.SetWindowCenter(-0.55, 0.0)
    plotter.camera.zoom(1.05)

    # VTK text coords are pixels from the bottom-left corner.
    # VTK text coords are pixels from the bottom-left corner. The PyVista SVG
    # has a ~2.35:1 aspect, so at width 640 the logo is ~272 px tall, and its
    # bottom edge sits at y=(630-60-272)=298 from the bottom. Drop the tagline
    # well below that.
    plotter.add_text(
        '3D plotting & analysis',
        position=(64, 230),
        font_size=28,
        color='#05080d',
        shadow=False,
        font='arial',
    )
    made_easy = plotter.add_text(
        'made easy',
        position=(64, 180),
        font_size=28,
        color='#05080d',
        shadow=False,
        font='arial',
    )
    made_easy.GetTextProperty().SetItalic(True)
    plotter.add_text(
        'pyvista.org',
        position=(66, 54),
        font_size=20,
        color='#05080d',
        shadow=False,
        font='arial',
    )

    screenshot = plotter.screenshot(return_img=True)
    plotter.close()

    canvas = Image.fromarray(screenshot).convert('RGBA')
    logo = _rasterize_svg(PUBLIC_DIR / 'branding' / 'pyvista.svg', width=640)
    canvas.alpha_composite(logo, dest=(60, 60))

    output_path = PUBLIC_DIR / 'og-image.jpg'
    canvas.convert('RGB').save(
        output_path,
        format='JPEG',
        quality=90,
        optimize=True,
        progressive=True,
    )
    print(f'Saved {output_path.relative_to(ROOT)}')


RENDERERS = (
    render_volume_rendering,
    render_gltf,
    render_pbr,
    render_pump_bracket,
    render_aero_bracket,
    render_cfd_data,
)


def main() -> None:
    """Render every themed marketing asset."""
    configure_theme()
    for theme in RENDER_THEMES:
        for renderer in RENDERERS:
            renderer(theme)
    render_og_image()


if __name__ == '__main__':
    main()
