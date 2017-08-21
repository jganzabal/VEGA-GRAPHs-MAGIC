import * as vega from 'vega'
import * as vegaTooltip from "vega-tooltip"
import * as linearvgSpec from "./jsons/linear.vg.json"

import * as chordVGSpec from "./jsons/edge-bundling.vg.json"
import * as forceBandsVGSpec from "./jsons/force-directed-layout.bands.json"
import forceVGSpec from "./jsons/force-directed-layout.json"
import './vega-tooltip.css';

import vegaHelper from "./vega-helper"

import * as $ from 'jquery'

window.$ = $

window.onload = function() {
    //vegaHelper.addVgExample("#vegaGraphAnalisys", linearvgSpec, true);
    vegaHelper.addVgExample("#vegaForceGraph", forceVGSpec, true);
    //vegaHelper.addVgExample("#vegaChordGraph", chordVGSpec, true);
};