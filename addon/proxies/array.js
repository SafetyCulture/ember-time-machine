import Ember from 'ember';
import RecordKeeperMixin from 'ember-time-machine/mixins/time-machine';
import Record from 'ember-time-machine/-private/Record';
import { wrapValue, unwrapValue } from 'ember-time-machine/utils/wrap-value';

const {
  isNone
} = Ember;

export default Ember.ArrayProxy.extend(RecordKeeperMixin, {
  objectAtContent(index) {
    return wrapValue(this, index, this._super(...arguments));
  },

  replaceContent(startIndex, numRemoved, objects) {
    const records = this.get('records');
    let before, after;

    if(!isNone(records)) {
      if(numRemoved > 0) {
        before = this.slice(startIndex, startIndex + numRemoved);
      } else {
        after = objects;
      }

      this._addRecord(new Record(this.get('content'), this.get('_path'), startIndex, before, after, true));
    }

    return this._super(startIndex, numRemoved, unwrapValue(objects));
  }
});
