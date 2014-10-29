describe('DataSet', function() {

    var data = [
        {'Id':1,'Forename':'Martin','Surname':'Watkins','Country':'Scotland','DisplayColour':'#38d33c','Age':1,'IQ':69, 'Interests':['Ballet', 'Music', 'Climbing'], 'Gender':'Male'},
        {'Id':2,'Forename':'Teresa','Surname':'Knight','Country':'Scotland','DisplayColour':'#6ee688','Age':20,'IQ':103, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
        {'Id':3,'Forename':'Mary','Surname':'Lee','Country':'Wales','DisplayColour':'#8e6bc2','Age':3,'IQ':96,'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'},
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
        {'Id':20,'Forename':'Frances','Surname':'Lawson','Country':'Northern Ireland','DisplayColour':'#e739c9','Age':14,'IQ':71, 'Interests':['Triathlon', 'Music', 'Mountain Biking'], 'Gender':'Female'}
    ];

    describe('extractData', function() {

        it('extracts the data that was supplied in the constructor', function() {

            // Given:
            var dataSet = new insight.DataSet(data);

            // When:
            var result = dataSet.extractData();

            // Then:
            expect(result).toEqual(data);
        });

    });

    describe('group', function() {

        it('creates a valid group', function() {

            // Given:
            var dataSet = new insight.DataSet(data);

            // When:
            var grouping = dataSet.group('country', function(d){return d.Country;});

            // Then:
            var expectedData = [
                { key : 'England', value : { count : 7 } },
                { key : 'Northern Ireland', value : { count : 6 } },
                { key : 'Scotland', value : { count : 3 } },
                { key : 'Wales', value : { count : 4 } }
            ];

            var extractedData = grouping.extractData();
            expect(extractedData).toEqual(expectedData);
        });

        it('creates a valid one-to-many group', function() {

            // Given:
            var dataSet = new insight.DataSet(data);

            // When:
            var grouping = dataSet.group('interests', function(d){ return d.Interests; }, true)
                .count(['Interests']);

            // Then:
            var expectedData = [
                { key : 'Music', value : 16 },
                { key : 'Triathlon', value : 11 },
                { key : 'Mountain Biking', value : 11 },
                { key : 'Climbing', value : 5 },
                { key : 'Football', value : 4 },
                { key : 'Kayaking', value : 4 },
                { key : 'Boxing', value : 4 },
                { key : 'Ballet', value : 1 }
            ];

            var extractedData = grouping.extractData();
            expect(extractedData).toEqual(expectedData);
        });

        it('can add a group with extra calculated values', function() {

            // Given:
            var dataSet = new insight.DataSet(data);

            // When:
            var grouping = dataSet.group('country', function(d){return d.Country;})
                .mean(['Age']);

            // Then:
            var extractedData = grouping.extractData();
            var scotland = extractedData.filter(function(d){return d.key=='Scotland';})[0];

            extractedData.forEach(function(d) {
                // Mitigate rounding differences across JavaScript engines
                d.value.Age.mean = parseFloat(d.value.Age.mean.toFixed(3));
            });

            expect(extractedData).toEqual([
                {
                    key : 'England',
                    value : { count : 7, Age : { sum : 97, count : 7, mean : 13.857 } }
                },
                {
                    key : 'Northern Ireland',
                    value : { count : 6, Age : { sum : 51, count : 6, mean : 8.5 } }
                },
                {
                    key : 'Scotland',
                    value : { count : 3, Age : { sum : 33, count : 3, mean : 11 } }
                },
                {
                    key : 'Wales',
                    value : { count : 4, Age : { sum : 24, count : 4, mean : 6 } }
                }
            ]);
        });

        it('creates a valid group when provided no data', function() {

            // Given:
            var emptyData = [];
            var dataSet = new insight.DataSet(emptyData);

            // When:
            var grouping = dataSet.group('country', function(d){return d.Country;});

            // Then:
            var extractedData = grouping.extractData();
            expect(extractedData).toEqual([]);
        });

    });
});

