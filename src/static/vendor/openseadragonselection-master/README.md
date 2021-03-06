# OpenSeadragonSelection

An OpenSeadragon plugin that provides functionality for selecting a rectangular part of an image.

## Demo

https://picturae.github.io/openseadragonselection/

## Usage

Include `dist/openseadragonselection.js` after OpenSeadragon in your html. Then after you create a viewer:

    var selection = viewer.selection(options);

Then you can alter the selection state with any of these:

    selection.enable();
    selection.disable();
    selection.toggleState();

## Options

    viewer.selection({
        element:                 null, // html element to use for overlay
        showSelectionControl:    true, // show button to toggle selection mode
        toggleButton:            null, // dom element to use as toggle button
        showConfirmDenyButtons:  true,
        styleConfirmDenyButtons: true,
        returnPixelCoordinates:  true,
        keyboardShortcut:        'c', // key to toggle selection mode
        rect:                    null, // initial selection as an OpenSeadragon.SelectionRect object
        startRotated:            false, // alternative method for drawing the selection; useful for rotated crops
        startRotatedHeight:      0.1, // only used if startRotated=true; value is relative to image height
        restrictToImage:         false, // true = do not allow any part of the selection to be outside the image
        onSelection:             function(rect) {}, // callback
        prefixUrl:               null, // overwrites OpenSeadragon's option
        navImages:               { // overwrites OpenSeadragon's options
            selection: {
                REST:   'selection_rest.png',
                GROUP:  'selection_grouphover.png',
                HOVER:  'selection_hover.png',
                DOWN:   'selection_pressed.png'
            },
            selectionConfirm: {
                REST:   'selection_confirm_rest.png',
                GROUP:  'selection_confirm_grouphover.png',
                HOVER:  'selection_confirm_hover.png',
                DOWN:   'selection_confirm_pressed.png'
            },
            selectionCancel: {
                REST:   'selection_cancel_rest.png',
                GROUP:  'selection_cancel_grouphover.png',
                HOVER:  'selection_cancel_hover.png',
                DOWN:   'selection_cancel_pressed.png'
            },
        }
    });

## To do

    - fix behavior when the viewer itself is rotated
    - test/fix with multiple images at once
