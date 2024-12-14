import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  usersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.firstName);
  },
  usersOneListFormatter(val) {
    if (!val) return '';
    return val.firstName;
  },
  usersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.firstName };
    });
  },
  usersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.firstName, id: val.id };
  },

  charactersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  charactersOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  charactersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  charactersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  scenariosManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.title);
  },
  scenariosOneListFormatter(val) {
    if (!val) return '';
    return val.title;
  },
  scenariosManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.title };
    });
  },
  scenariosOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.title, id: val.id };
  },

  traitsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.description);
  },
  traitsOneListFormatter(val) {
    if (!val) return '';
    return val.description;
  },
  traitsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.description };
    });
  },
  traitsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.description, id: val.id };
  },

  versionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.version_number);
  },
  versionsOneListFormatter(val) {
    if (!val) return '';
    return val.version_number;
  },
  versionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.version_number };
    });
  },
  versionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.version_number, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
