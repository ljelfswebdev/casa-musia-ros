// templates/pages/homepage.js
export const HOMEPAGE_TEMPLATE = [
  {
    key: 'section1',
    label: 'Hero',
    fields: [
      {
        name: 'backgroundImage',
        label: 'Background Image',
        type: 'image',
      },
      {
        name: 'title',
        label: 'Title',
        type: 'text',
      },

      {
        name: 'strapline_es',
        label: 'Strapline ES',
        type: 'rich',
      },
      {
        name: 'strapline_en',
        label: 'Strapline EN',
        type: 'rich',
      },
      {
        name: 'strapline_fr',
        label: 'Strapline FR',
        type: 'rich',
      },
      {
        name: 'strapline_de',
        label: 'Strapline DE',
        type: 'rich',
      },
    ],
  },

  // SECTION 2 – Gallery
  {
    key: 'section2',
    label: 'Gallery',
    fields: [
      {
        name: 'images',
        label: 'Gallery Images',
        type: 'repeater',
        of: [
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
        ],
      },
    ],
  },

  // SECTION 3 – About La Casa
  {
    key: 'section3',
    label: 'About La Casa',
    fields: [
      {
        name: 'image',
        label: 'Image',
        type: 'image',
      },
      {
        name: 'title_es',
        label: 'Title ES',
        type: 'text',
      },
      {
        name: 'title_en',
        label: 'Title EN',
        type: 'text',
      },
      {
        name: 'title_fr',
        label: 'Title FR',
        type: 'text',
      },
      {
        name: 'title_de',
        label: 'Title DE',
        type: 'text',
      },
      {
        name: 'body_es',
        label: 'Body ES',
        type: 'rich',
      },
      {
        name: 'body_en',
        label: 'Body EN',
        type: 'rich',
      },
      {
        name: 'body_fr',
        label: 'Body FR',
        type: 'rich',
      },
      {
        name: 'body_de',
        label: 'Body DE',
        type: 'rich',
      },
    ],
  },

  // SECTION 4 – House Rules
 {
    key: 'section4',
    label: 'House Rules',
    fields: [
      {
        name: 'items',
        label: 'Rules',
        type: 'repeater',
        of: [
          {
            name: 'title_es',
            label: 'Title ES',
            type: 'text',
          },
          {
            name: 'title_en',
            label: 'Title EN',
            type: 'text',
          },
          {
            name: 'title_fr',
            label: 'Title FR',
            type: 'text',
          },
          {
            name: 'title_de',
            label: 'Title DE',
            type: 'text',
          },
        
        ],
      },
    ],
  },

  // SECTION 5 – House Amenities
  {
    key: 'section5',
    label: 'House Amenities',
    fields: [
      {
        name: 'items',
        label: 'Amenities',
        type: 'repeater',
        of: [
          {
            name: 'icon',
            label: 'Icon',
            type: 'image',
          },
          {
            name: 'title_es',
            label: 'Title ES',
            type: 'text',
          },
          {
            name: 'title_en',
            label: 'Title EN',
            type: 'text',
          },
          {
            name: 'title_fr',
            label: 'Title FR',
            type: 'text',
          },
          {
            name: 'title_de',
            label: 'Title DE',
            type: 'text',
          },
        
        ],
      },
    ],
  },

  // SECTION 6 – Places to Eat
  {
    key: 'section6',
    label: 'Places to Eat',
    fields: [
      {
        name: 'places',
        label: 'Places to Eat',
        type: 'repeater',
        of: [
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
          {
            name: 'title',
            label: 'Title',
            type: 'text',
          },
          {
            name: 'body_es',
            label: 'Content ES',
            type: 'rich',
          },
          {
            name: 'body_en',
            label: 'Content EN',
            type: 'rich',
          },
          {
            name: 'body_fr',
            label: 'Content FR',
            type: 'rich',
          },
          {
            name: 'body_de',
            label: 'Content DE',
            type: 'rich',
          },
        ],
      },
    ],
  },

  // SECTION 7 – Tourist Attractions
  {
    key: 'section7',
    label: 'Tourist Attractions',
    fields: [
      {
        name: 'attractions',
        label: 'Attractions',
        type: 'repeater',
        of: [
          {
            name: 'image',
            label: 'Image',
            type: 'image',
          },
          {
            name: 'title',
            label: 'Title',
            type: 'text',
          },
          {
            name: 'body_es',
            label: 'Content ES',
            type: 'rich',
          },
          {
            name: 'body_en',
            label: 'Content EN',
            type: 'rich',
          },
          {
            name: 'body_fr',
            label: 'Content FR',
            type: 'rich',
          },
          {
            name: 'body_de',
            label: 'Content DE',
            type: 'rich',
          },
        ],
      },
    ],
  },

  // SECTION 8 – Contact Details
  {
    key: 'section8',
    label: 'Contact Details',
    fields: [
      {
        name: 'image',
        label: 'Portrait Image',
        type: 'image',
      },
      {
        name: 'title_es',
        label: 'Title ES',
        type: 'text',
      },
      {
        name: 'title_en',
        label: 'Title EN',
        type: 'text',
      },
      {
        name: 'title_fr',
        label: 'Title FR',
        type: 'text',
      },
      {
        name: 'title_de',
        label: 'Title DE',
        type: 'text',
      },
      {
        name: 'body_es',
        label: 'Content ES',
        type: 'rich',
      },
      {
        name: 'body_en',
        label: 'Content EN',
        type: 'rich',
      },
      {
        name: 'body_fr',
        label: 'Content FR',
        type: 'rich',
      },
      {
        name: 'body_de',
        label: 'Content DE',
        type: 'rich',
      },
    ],
  },

  // SECTION 9 – FAQs
  {
    key: 'section9',
    label: 'FAQs',
    fields: [
      {
        name: 'faqs',
        label: 'FAQs',
        type: 'repeater',
        of: [
          {
            name: 'question_es',
            label: 'Question ES',
            type: 'text',
          },
          {
            name: 'question_en',
            label: 'Question EN',
            type: 'text',
          },
          {
            name: 'question_fr',
            label: 'Question FR',
            type: 'text',
          },
          {
            name: 'question_de',
            label: 'Question DE',
            type: 'text',
          },
          {
            name: 'answer_es',
            label: 'Answer ES',
            type: 'rich',
          },
          {
            name: 'answer_en',
            label: 'Answer EN',
            type: 'rich',
          },
          {
            name: 'answer_fr',
            label: 'Answer FR',
            type: 'rich',
          },
          {
            name: 'answer_de',
            label: 'Answer DE',
            type: 'rich',
          },
        ],
      },
    ],
  },
];