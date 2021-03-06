var tabledata = 
[{'Id':1,'Forename':'Martin','Surname':'Watkins','Country':'Scotland','DisplayColour':'#38d33c','Age':1,'IQ':69,'Gender':'Male','Interests':['Ballet', 'Music', 'Climbing'],},
{'Id':2,'Forename':'Teresa','Surname':'Knight','Country':'Scotland','DisplayColour':'#6ee688','Age':20,'IQ':103,'Interests':['Triathlon', 'Music', 'Mountain Biking'],'Gender':'Female'},
{'Id':3,'Forename':'Mary','Surname':'Lee','Country':'Wales','DisplayColour':'#8e6bc2','Age':3,'IQ':96,'Interests':['Triathlon', 'Music', 'Mountain Biking'],'Gender':'Female'},
{'Id':4,'Forename':'Sandra','Surname':'Harrison','Country':'Northern Ireland','DisplayColour':'#02acd0','Age':16,'IQ':55, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':5,'Forename':'Frank','Surname':'Cox','Country':'England','DisplayColour':'#0b281c','Age':5,'IQ':105,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
{'Id':6,'Forename':'Mary','Surname':'Jenkins','Country':'England','DisplayColour':'#5908e3','Age':19,'IQ':69,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':7,'Forename':'Earl','Surname':'Stone','Country':'Wales','DisplayColour':'#672542','Age':6,'IQ':60,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Male'},
{'Id':8,'Forename':'Ashley','Surname':'Carr','Country':'England','DisplayColour':'#f9874f','Age':18,'IQ':63,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':9,'Forename':'Judy','Surname':'Mcdonald','Country':'Northern Ireland','DisplayColour':'#3ab1a8','Age':2,'IQ':70,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':10,'Forename':'Earl','Surname':'Flores','Country':'England','DisplayColour':'#1be47c','Age':20,'IQ':93,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
{'Id':11,'Forename':'Terry','Surname':'Wheeler','Country':'Wales','DisplayColour':'#2cd57b','Age':4,'IQ':87,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
{'Id':12,'Forename':'Willie','Surname':'Reid','Country':'Northern Ireland','DisplayColour':'#7fcf1e','Age':7,'IQ':86,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
{'Id':13,'Forename':'Deborah','Surname':'Palmer','Country':'Northern Ireland','DisplayColour':'#9fd1d5','Age':5,'IQ':85,'Interests':['Climbing', 'Boxing'], 'Gender':'Female'},
{'Id':14,'Forename':'Annie','Surname':'Jordan','Country':'England','DisplayColour':'#8f4fd1','Age':10,'IQ':100, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':15,'Forename':'Craig','Surname':'Gibson','Country':'England','DisplayColour':'#111ab4','Age':7,'IQ':106,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
{'Id':16,'Forename':'Lisa','Surname':'Parker','Country':'England','DisplayColour':'#52d5cf','Age':18,'IQ':53,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Female'},
{'Id':17,'Forename':'Samuel','Surname':'Willis','Country':'Wales','DisplayColour':'#e2f6cc','Age':11,'IQ':98, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':18,'Forename':'Lisa','Surname':'Chapman','Country':'Northern Ireland','DisplayColour':'#1c5829','Age':7,'IQ':51, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
{'Id':19,'Forename':'Ryan','Surname':'Freeman','Country':'Scotland','DisplayColour':'#6cbc04','Age':12,'IQ':96, 'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
{'Id':20,'Forename':'Frances','Surname':'Lawson','Country':'Northern Ireland','DisplayColour':'#e739c9','Age':14,'IQ':71, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'}];


var createElement = function(namespace, tag) {
    return document.createElementNS(namespace, tag);
};

describe('Utils', function() {

    describe('fontSizeFromFont', function() {

        it('extracts font size from end of font string', function() {

            // Given
            var testString = 'Comic Sans 11px';

            // When
            var result = insight.utils.fontSizeFromFont(testString);

            // Then
            expect(result).toBe(11);

        });

        it('extracts font size from start of font string', function() {

            // Given
            var testString = '11pt Comic Sans';

            // When
            var result = insight.utils.fontSizeFromFont(testString);

            // Then
            expect(result).toBe(11);

        });

        it('extracts the first font size from font string', function() {

            // Given
            var testString = '14pt Comic Sans 25px';

            // When
            var result = insight.utils.fontSizeFromFont(testString);

            // Then
            expect(result).toBe(14);

        });

        it('returns 12 if the given font contains no size', function() {

            // Given
            var testString = 'Comic Sans';

            // When
            var result = insight.utils.fontSizeFromFont(testString);

            // Then
            expect(result).toBe(12);

        });

        it('returns 12 if empty font string provided', function() {

            // Given
            var testString = '';

            // When
            var result = insight.utils.fontSizeFromFont(testString);

            // Then
            expect(result).toBe(12);

        });

        it('returns 12 if undefined font provided', function() {

            // Given
            var testString = undefined;

            // When
            var result = insight.utils.fontSizeFromFont(testString);

            // Then
            expect(result).toBe(12);

        });

    });

    it('correctly identifies arrays', function() {
        
        var data = {
            arrayProperty: ['a','b','c','d','e','f'],
            numberProperty: 1231231,
            stringProperty: 'Hello!',
            objectProperty: {id:1, name:'blah'}
        };

        expect(insight.utils.isArray(data.arrayProperty)).toBe(true);
        expect(insight.utils.isArray(data.numberProperty)).toBe(false);
        expect(insight.utils.isArray(data.stringProperty)).toBe(false);
        expect(insight.utils.isArray(data.objectProperty)).toBe(false);
    });

    it('combines two arrays, removing duplicates', function() {
        
        // Given
        var firstArray = ['a','b','c','d','e','f'];
        var secondArray = ['c','d','e','f', 'g', 'h', 'i'];
        
        var combinedArray = firstArray.concat(secondArray);

        // Then

        var expectedResult = ['a','b','c','d','e','f','g','h','i'];
        var actualResult = insight.utils.arrayUnique(combinedArray);

        expect(actualResult).toEqual(expectedResult);
    });

    it('can calculate a dimensional slice', function(){
        // Given 

        var input = 'Scotland';

        // Then

        var expectedResult = 'in_Scotland';
        var actualResult = insight.utils.keySelector(input);

        expect(actualResult).toBe(expectedResult);
    });

    it('takeWhere returns correct items', function(){
        // Given 

        var input = tabledata;

        // Then

        var expectedResult = 
            [
                {'Id':1,'Forename':'Martin','Surname':'Watkins','Country':'Scotland','DisplayColour':'#38d33c','Age':1,'IQ':69,'Gender':'Male','Interests':['Ballet', 'Music', 'Climbing'],},
                {'Id':2,'Forename':'Teresa','Surname':'Knight','Country':'Scotland','DisplayColour':'#6ee688','Age':20,'IQ':103,'Interests':['Triathlon', 'Music', 'Mountain Biking'],'Gender':'Female'},
                {'Id':19,'Forename':'Ryan','Surname':'Freeman','Country':'Scotland','DisplayColour':'#6cbc04','Age':12,'IQ':96, 'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'}
            ];

        var actualResult = insight.utils.takeWhere(input, 'Country', 'Scotland');

        expect(actualResult).toEqual(expectedResult);
    });



    it('removeWhere removes correct items', function(){
        // Given 

        // shallow copy to not affect other tests;
        var input = tabledata.slice(0);

        // Then

        var expectedResult =
                [
                    {'Id':3,'Forename':'Mary','Surname':'Lee','Country':'Wales','DisplayColour':'#8e6bc2','Age':3,'IQ':96,'Interests':['Triathlon', 'Music', 'Mountain Biking'],'Gender':'Female'},
                    {'Id':4,'Forename':'Sandra','Surname':'Harrison','Country':'Northern Ireland','DisplayColour':'#02acd0','Age':16,'IQ':55, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':5,'Forename':'Frank','Surname':'Cox','Country':'England','DisplayColour':'#0b281c','Age':5,'IQ':105,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
                    {'Id':6,'Forename':'Mary','Surname':'Jenkins','Country':'England','DisplayColour':'#5908e3','Age':19,'IQ':69,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':7,'Forename':'Earl','Surname':'Stone','Country':'Wales','DisplayColour':'#672542','Age':6,'IQ':60,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Male'},
                    {'Id':8,'Forename':'Ashley','Surname':'Carr','Country':'England','DisplayColour':'#f9874f','Age':18,'IQ':63,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':9,'Forename':'Judy','Surname':'Mcdonald','Country':'Northern Ireland','DisplayColour':'#3ab1a8','Age':2,'IQ':70,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':10,'Forename':'Earl','Surname':'Flores','Country':'England','DisplayColour':'#1be47c','Age':20,'IQ':93,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
                    {'Id':11,'Forename':'Terry','Surname':'Wheeler','Country':'Wales','DisplayColour':'#2cd57b','Age':4,'IQ':87,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
                    {'Id':12,'Forename':'Willie','Surname':'Reid','Country':'Northern Ireland','DisplayColour':'#7fcf1e','Age':7,'IQ':86,'Interests':['Climbing', 'Boxing'], 'Gender':'Male'},
                    {'Id':13,'Forename':'Deborah','Surname':'Palmer','Country':'Northern Ireland','DisplayColour':'#9fd1d5','Age':5,'IQ':85,'Interests':['Climbing', 'Boxing'], 'Gender':'Female'},
                    {'Id':14,'Forename':'Annie','Surname':'Jordan','Country':'England','DisplayColour':'#8f4fd1','Age':10,'IQ':100, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':15,'Forename':'Craig','Surname':'Gibson','Country':'England','DisplayColour':'#111ab4','Age':7,'IQ':106,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Male'},
                    {'Id':16,'Forename':'Lisa','Surname':'Parker','Country':'England','DisplayColour':'#52d5cf','Age':18,'IQ':53,'Interests':['Football', 'Music', 'Kayaking'], 'Gender':'Female'},
                    {'Id':17,'Forename':'Samuel','Surname':'Willis','Country':'Wales','DisplayColour':'#e2f6cc','Age':11,'IQ':98, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':18,'Forename':'Lisa','Surname':'Chapman','Country':'Northern Ireland','DisplayColour':'#1c5829','Age':7,'IQ':51, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
                    {'Id':20,'Forename':'Frances','Surname':'Lawson','Country':'Northern Ireland','DisplayColour':'#e739c9','Age':14,'IQ':71, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'}
                ];


        insight.utils.removeWhere(input, 'Country', 'Scotland');

        expect(input).toEqual(expectedResult);
    });
    
    it('arrayContains works in a true scenario with a value', function() {

        // Given

        var input = [1,2,3,4,5,6];

        // Then

        var expectedResult = true;
        var actualResult = insight.utils.arrayContains(input, 3);

        expect(actualResult).toEqual(expectedResult);
    });


    it('arrayContains works in a true scenario with an object', function() {

        // Given

        
        var value = {key:'Hello', value: 'World'};
        var input = [1,2,3,4,5,value];
        // Then

        var expectedResult = true;
        var actualResult = insight.utils.arrayContains(input, value);

        expect(actualResult).toEqual(expectedResult);
    });



    it('unions two objects, prioritizing the first', function() {
        
        // Given
        var base =  {'font': 'arial', 'display':'block'};
        var extension = {'font-size': '17px', 'display': 'inline'};
        
        
        // Then

        var expectedResult = {'font': 'arial', 'display':'block', 'font-size': '17px'};
        var actualResult = insight.utils.objectUnion(base, extension);

        expect(actualResult).toEqual(expectedResult);
    });

    it('unions two objects, if second is empty', function() {
        
        // Given
        var base =  {'font': 'arial', 'display':'block'};
        var extension = {};
        
        
        // Then

        var expectedResult = {'font': 'arial', 'display':'block'};
        var actualResult = insight.utils.objectUnion(base, extension);

        expect(actualResult).toEqual(expectedResult);
    });


    it('calculates the north point of an SVG element', function() {
        
        // Given
        var svg = createElement('http://www.w3.org/2000/svg', 'svg' );
        svg.id  = 'svg';
        svg.style = 'width:400px; height:300px';

        var rect = createElement('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x','100');
        rect.setAttribute('y','50');
        rect.setAttribute('width','20');
        rect.setAttribute('height','150');
                
        svg.appendChild(rect);
        document.body.appendChild(svg);
        // When
        
        var boundingBox = insight.utils.getSVGBoundingBox(rect);

        // Then
        
        var expectedNorthX = 110;
        var expectedNorthY = 50;

        var actualNorthX = boundingBox.n.x;
        var actualNorthY = boundingBox.n.y;

        expect(actualNorthY).toEqual(expectedNorthY);
        expect(expectedNorthX).toEqual(expectedNorthX);


        // Tidy up

        document.body.removeChild(svg);
    });


    it('multisort works correctly with a single ascending sort', function() {
        
        // Given 

        var data = tabledata;
        var sorters = [
            {
                sortParameter: function(d) { return d.IQ; },
                order: 'ASC'
            }
        ];
     
        // When

        var actualData = insight.utils.multiSort(tabledata, sorters)
                                      .map(function(point){return point.IQ;});

        var expectedData= [51, 53, 55, 60, 63, 69, 69, 70, 71, 85, 86, 87, 93, 96, 96, 98, 100, 103, 105, 106] ;
        // Then
        
        expect(actualData).toEqual(expectedData)
            
        
    });



    it('multisort works correctly with a single descending sort', function() {
        
        // Given 

        var data = tabledata;
        var sorters = [
            {
                sortParameter: function(d) { return d.IQ; },
                order: 'DESC'
            }
        ];
     
        // When 

        var actualData = insight.utils.multiSort(tabledata, sorters)
                                      .map(function(d){return d.IQ;});
        var expectedData = [106, 105, 103, 100, 98, 96, 96, 93, 87, 86, 85, 71, 70, 69, 69, 63, 60, 55, 53, 51];

        // Then
        
        expect(actualData).toEqual(expectedData);
    });



    it('multisort works correctly with an ascending and descending sort', function() {
        
        // Given 

        var data = tabledata;
        var sorters = [
            {
                sortParameter: function(d) { return d.Country; },
                order: 'ASC'
            },
            {
                sortParameter: function(d) { return d.Age; },
                order: 'DESC'
            }
        ];
     
        // When 

        var actualCountries = insight.utils.multiSort(tabledata, sorters).map(function(d){return d.Country;});
        var actualAges = insight.utils.multiSort(tabledata, sorters).map(function(d){return d.Age;});

        var expectedCountries = ["England", "England", "England", "England", "England", "England", "England", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Scotland", "Scotland", "Scotland", "Wales", "Wales", "Wales", "Wales"];
        var expectedAges = [20, 19, 18, 18, 10, 7, 5, 16, 14, 7, 7, 5, 2, 20, 12, 1, 11, 6, 4, 3];

        // Then

        expect(actualCountries).toEqual(expectedCountries);
        expect(actualAges).toEqual(expectedAges);
    });

    it('multisort works correctly with a descending and ascending sort', function() {
        
        // Given 

        var data = tabledata;
        var sorters = [
            {
                sortParameter: function(d) { return d.Country; },
                order: 'DESC'
            },
            {
                sortParameter: function(d) { return d.Age; },
                order: 'ASC'
            }
        ];
     
        // When

        var actualCountries = insight.utils.multiSort(tabledata, sorters).map(function(d){return d.Country;});
        var actualAges = insight.utils.multiSort(tabledata, sorters).map(function(d){return d.Age;});
        
        var expectedCountries = ["Wales", "Wales", "Wales", "Wales", "Scotland", "Scotland", "Scotland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "Northern Ireland", "England", "England", "England", "England", "England", "England", "England"];
        var expectedAges = [3, 4, 6, 11, 1, 12, 20, 2, 5, 7, 7, 14, 16, 5, 7, 10, 18, 18, 19, 20];

        // Then
        
        expect(actualCountries).toEqual(expectedCountries);
        expect(actualAges).toEqual(expectedAges);
    });

    it('adding to a set works when the element isnt in there', function() {
        
        // Given 
        var set = [1,2,3];
        var value = 4;

        // When

        insight.utils.addToSet(set, value);

        // Then
        var expectedResult = [1,2,3,4];

        expect(set).toEqual(expectedResult);
    });   

    
    it('adding to a set works when the element is already in there', function() {
        
        // Given 
        var set = [1,2,3,4];
        var value = 4;

        // When

        insight.utils.addToSet(set, value);

        // Then
        var expectedResult = [1,2,3,4];

        expect(set).toEqual(expectedResult);
    });  
    
    describe('lastElement', function() {
    
        it('undefined if passed empty array', function(){
            
            expect(insight.utils.lastElement([])).not.toBeDefined();
        
        });
        
        it('undefined if passed non array', function(){
            
            spyOn(insight.utils, 'isArray').andReturn(false);
            
            var emptyObject = {};
            
            expect(insight.utils.lastElement(emptyObject)).not.toBeDefined();
            
            expect(insight.utils.isArray).toHaveBeenCalledWith(emptyObject);
        
        });
        
        it('undefined if passed undefied', function(){
            
            expect(insight.utils.lastElement(undefined)).not.toBeDefined();
        
        });
        
        it('undefined if passed null', function(){
            
            expect(insight.utils.lastElement(null)).not.toBeDefined();
        
        });
        
        it('returns last element of array', function(){
            
            expect(insight.utils.lastElement([1,2,3])).toBe(3);
        
        });
    
    });

    describe('getElementStyles', function() {
        var errorContainer,
            getComputedStyleResult,
            propertiesOnElement;

        beforeEach(function() {
            propertiesOnElement = [];

            getComputedStyleResult = {
                getPropertyValue: jasmine.createSpy('getPropertyValue').andCallFake(function(property) {
                    var matchedProperties = propertiesOnElement.filter(function(p) {
                        return p.propertyName === property;
                    });

                    if(matchedProperties.length > 0) {
                        return matchedProperties[0].value;
                    }

                    // It is tricky to know what the canonical response should be:
                    // - Under Chrome it is ""
                    // - Under Firefox it is null
                    // In either case, it is not a truthy value
                    return "";
                })
            }

            spyOn(insight.utils, 'getNativeComputedStyle').andReturn(getComputedStyleResult);

            errorContainer = new insight.ErrorContainer();

        });

        it('returns an empty object when given no properties', function() {

            // Given
            var aMockElement = {};

            // When
            var result = insight.utils.getElementStyles(aMockElement, []);

            // Then
            expect(getComputedStyleResult.getPropertyValue).not.toHaveBeenCalled();
            expect(result).toEqual({});

        });

        describe('when provided with a named property', function() {
            var property;

            beforeEach(function() {
                property = {
                    propertyName: 'height',
                    value: '22px'
                };
                propertiesOnElement.push(property);
            });

            it('returns object with property when property exists on element', function () {

                // Given
                var aMockElement = {};

                // When
                var result = insight.utils.getElementStyles(aMockElement, [property.propertyName]);

                // Then
                expect(getComputedStyleResult.getPropertyValue).toHaveBeenCalled();
                expect(result[property.propertyName]).toEqual(property.value);

            });

            it('returns object with property falsely when property does not exists on element', function () {

                // Given
                var aMockElement = {};

                // When
                var lookForProperty = 'font-size';
                var result = insight.utils.getElementStyles(aMockElement, [lookForProperty]);

                // Then
                expect(getComputedStyleResult.getPropertyValue).toHaveBeenCalled();
                expect(result[lookForProperty]).toBeFalsy();
            });
       });

    });

    describe('arrayEquals', function() {
        it('matches empty arrays', function() {
            //When:
            var equalArrays = insight.utils.arrayEquals([], []);

            //Then:
            expect(equalArrays).toBe(true);
        });

        it('matches string arrays', function() {
            //When:
            var equalArrays = insight.utils.arrayEquals(['abc', 'def', 'ghi'], ['abc', 'def', 'ghi']);

            //Then:
            expect(equalArrays).toBe(true);
        });

        it('does not match string arrays of different lengths', function() {
            //When:
            var equalArrays = insight.utils.arrayEquals(['abc', 'def'], ['abc', 'def', 'ghi']);

            //Then:
            expect(equalArrays).toBe(false);
        });

        it('does not match string arrays of different contents', function() {
            //When:
            var equalArrays = insight.utils.arrayEquals(['abc', 'def', 'jkl'], ['abc', 'def', 'ghi']);

            //Then:
            expect(equalArrays).toBe(false);
        });

        it('matches date arrays of identical contents', function() {
            //When:
            var equalArrays = insight.utils.arrayEquals([new Date(2014, 5)], [new Date(2014, 5)]);

            //Then:
            expect(equalArrays).toBe(true);
        });

        it('does not match date arrays of differing contents', function() {
            //When:
            var equalArrays = insight.utils.arrayEquals([new Date(2014, 5)], [new Date(2015, 8)]);

            //Then:
            expect(equalArrays).toBe(false);
        });
    });
});

