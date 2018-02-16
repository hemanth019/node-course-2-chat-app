  const expect = require('expect');
  const {isRealString} = require('./validation');

  //import isRealString

  // isRealString
    //should reject non-string values
    //should reject string with only spaces
    //should allow string with non-space characters

    describe('isRealString', () => {
      // it('should generate correct message object', () => {
      //   var from = 'Jen';
      //   var text = 'Some message';
      //   var message = generateMessage(from, text);
      //
      //   expect(message.createdAt).toBeA('number');
      //   expect(message).toInclude({from, text});
      // });

      it('should reject non-string values', () => {
        // var input = '15';
        var res = isRealString(15);

        expect(res).toBe(false);
      });

      it('should reject string with only spaces', () => {
        var res = isRealString('      ');
        expect(res).toBe(false);
      });

      it('should allow string with non-space characters', () => {
        var res = isRealString(' hemanth varra  ');
        expect(res).toBe(true);
      });
    });
