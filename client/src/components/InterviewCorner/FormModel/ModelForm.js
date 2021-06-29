export default {
  formId: 'InterviewExperienceForm',
  formField: {
    role: {
      name: 'role',
      label: 'Role*',
      requiredErrorMsg: 'Role is required'
    },
    passoutYear: {
      name: 'passoutYear',
      label: 'Passout Year*',
      requiredErrorMsg: 'Passout Year is required',
      invalidErrorMsg: 'Passout Year is not valid'
    },
    branch: {
      name: 'branch',
      label: 'Branch*',
      requiredErrorMsg: 'Branch is required'
    },
    status: {
      name: 'status',
      label: 'Status*',
      requiredErrorMsg: 'Status is required'
    },
    intro: {
      name: 'intro',
      label: 'Introduce Yourself*',
      requiredErrorMsg: 'Please! Introduce Yourself',
      lengthErrorMsg: 'Must be less than 300 characters'
    },


    prep: {
      name: 'prep',
      label: 'Preparation*',
      requiredErrorMsg: 'Preparation is required'
    },

    appProcess: {
      name: 'appProcess',
      label: 'Application Process*',
      requiredErrorMsg: 'Application Process is required'
    },

    suggestions: {
      name: 'suggestions',
      label: 'Suggestions*',
      requiredErrorMsg: 'Suggestions are required'
    },

    roundName: {
      name: 'roundName',
      label: 'Round Name*',
      requiredErrorMsg: 'Please! Enter Round Name'
    },
    roundInfo: {
      name: 'roundInfo',
      label: 'Round Information*',
      requiredErrorMsg: 'Please! Enter Round Information'
    },
    roundTips: {
      name: 'roundTips',
      label: 'Round Tips*',
      requiredErrorMsg: 'Plase! Enter Round Tips'
    }

    // country: {
    //   name: 'country',
    //   label: 'Country*',
    //   requiredErrorMsg: 'Country is required'
    // },
    // continent: {
    //   name: 'continent',
    //   label: 'Continent*',
    //   requiredErrorMsg: 'Continent is required'
    // },
  }
};
