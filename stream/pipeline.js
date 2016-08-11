
var split = require('split'),
    through = require('through2'),
    model = require('pelias-model'),
    parser = require('./parser'),
    unwrap = require('./unwrap'),
    centroid = require('./centroid'),
    document = require('./document');

function pipeline( streamIn, streamOut ){
  return streamIn
    .pipe( split() )
    .pipe( parser( 6 ) )
    .pipe( unwrap() )
    .pipe( centroid() )
    .pipe( document( 'openstreetmap', 'street', 'polyline' ) )
    .pipe( model.createDocumentMapperStream() )
    .pipe( streamOut );
}

module.exports = pipeline;