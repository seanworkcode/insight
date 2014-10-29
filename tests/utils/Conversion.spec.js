describe("Conversion for", function() {

    describe("arffToJson", function() {

        it("convert arff file, basic types", function() {
            //Given:
            var arff = "@RELATION iris\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE bar REAL\n@ATTRIBUTE see STRING\n\n@DATA\n1,3.5,do\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1);
            expect(json[0].bar).toBe(3.5);
            expect(json[0].see).toBe('do');
        });

        it("convert arff file, include carraige returns", function() {
            //Given:
            var arff = "@RELATION iris\n\n@ATTRIBUTE foo NUMERIC\n\n@ATTRIBUTE bar REAL\n\n@ATTRIBUTE see STRING\n\n@DATA\n1,3.5,do\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1);
            expect(json[0].bar).toBe(3.5);
            expect(json[0].see).toBe('do');
        });

        it("convert arff file, empty data", function() {
            //Given:
            var arff = "@RELATION iris\n\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE bar REAL\n\n@ATTRIBUTE see STRING\n\n@DATA\n,2.0,saw\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(isNaN(json[0].foo)).toBe(true);
            expect(json[0].bar).toBe(2.0);
            expect(json[0].see).toBe('saw');
        });

        it("convert arff file, wrong type, numeric - string", function() {
            //Given:
            var arff = "@RELATION iris\n\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE bar REAL\n\n@ATTRIBUTE see STRING\n\n@DATA\nbleh,2.0,saw\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(isNaN(json[0].foo)).toBe(true);
            expect(json[0].bar).toBe(2.0);
            expect(json[0].see).toBe('saw');
        });

        it("convert arff file, wrong type, real - string", function() {
            //Given:
            var arff = "@RELATION iris\n\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE bar REAL\n\n@ATTRIBUTE see STRING\n\n@DATA\n1,$,saw\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1);
            expect(isNaN(json[0].bar)).toBe(true);
            expect(json[0].see).toBe('saw');
        });

        it("convert arff file, wrong type, string - numeric", function() {
            //Given:
            var arff = "@RELATION iris\n\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE bar REAL\n\n@ATTRIBUTE see STRING\n\n@DATA\n1,2.0,2\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1);
            expect(json[0].bar).toBe(2.0);
            expect(json[0].see).toBe('2');
        });

        it("convert arff file, missing data value", function() {
            //Given:
            var arff = "@RELATION iris\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE bar REAL\n@ATTRIBUTE see STRING\n\n@DATA\n3.5,do\n2,2.5,while\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(2);
            expect(json[0].bar).toBe(2.5);
            expect(json[0].see).toBe('while');
        });

        it("convert arff file, basic types", function() {
            //Given:
            var arff = "@RELATION iris\n\n@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE class {lots,of,things}\n@ATTRIBUTE see STRING\n\n@DATA\n1,of,do\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1);
            expect(json[0].class).toBe('of');
            expect(json[0].see).toBe('do');
        });

        it("convert arff file, carriage return", function() {
            //Given:
            var arff = "@RELATION iris\r@ATTRIBUTE foo NUMERIC\n@ATTRIBUTE class {lots,of,things}\r\n@ATTRIBUTE see STRING\r\r@DATA\r1,of,do\r\r";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1);
            expect(json[0].class).toBe('of');
            expect(json[0].see).toBe('do');
        });

        it("convert arff file, tabs in attributes", function() {
            //Given:
            var arff = "@RELATION iris\n@ATTRIBUTE foo REAL\n@ATTRIBUTE bar \t REAL\n@ATTRIBUTE joe \tREAL\n@ATTRIBUTE see\tREAL\n\n@DATA\n1.1,2.2,3.3,4.4\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1.1);
            expect(json[0].bar).toBe(2.2);
            expect(json[0].joe).toBe(3.3);
            expect(json[0].see).toBe(4.4);
        });

        it("convert arff file, value wrapped in string", function() {
            //Given:
            var arff = "@RELATION iris\n@ATTRIBUTE foo REAL\n@ATTRIBUTE bar string\n\n@DATA\n1.1,do\n2.2,\'while\'\n\n";
            var json = insight.conversion.arffToJson(arff);

            //Then:
            expect(json[0].foo).toBe(1.1);
            expect(json[0].bar).toBe('do');

            expect(json[1].foo).toBe(2.2);
            expect(json[1].bar).toBe('while');
        });

    });

});
