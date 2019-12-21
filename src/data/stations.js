import line1 from './line1';
import line2 from './line2';

const stations = [
  {
    id: 'Tanjung Malim',
    name: 'Tanjung Malim',
    lat: 3.684803,
    long: 101.518417,
  },
  {
    id: 'Kuala Kubu Bharu',
    name: 'Kuala Kubu Bharu',
    lat: 3.553269,
    long: 101.639570,
  },
  {
    id: 'Rasa',
    name: 'Rasa',
    lat: 3.500187,
    long: 101.634145,
  },
  {
    id: 'Batang Kali',
    name: 'Batang Kali',
    lat: 3.468380,
    long: 101.637731,
  },
  {
    id: 'Serendah',
    name: 'Serendah',
    lat: 3.375997,
    long: 101.614458,
  },
  {
    id: 'Rawang',
    name: 'Rawang',
    lat: 3.318991,
    long: 101.574974,
  },
  {
    id: 'Kuang',
    name: 'Kuang',
    lat: 3.258263,
    long: 101.554724,
  },
  {
    id: 'Sungai Buloh',
    name: 'Sungai Buloh',
    lat: 3.206373,
    long: 101.580101,
  },
  {
    id: 'Kepong Sentral',
    name: 'Kepong Sentral',
    lat: 3.208693,
    long: 101.628516,
  },
  {
    id: 'Kepong',
    name: 'Kepong',
    lat: 3.202814,
    long: 101.637378,
  },
  {
    id: 'Segambut',
    name: 'Segambut',
    lat: 3.186437,
    long: 101.664201,
  },
  {
    id: 'Sentul',
    name: 'Sentul',
    lat: 3.182177,
    long: 101.688693,
  },
  {
    id: 'Putra',
    name: 'Putra',
    lat: 3.165296,
    long: 101.691008,
  },
  {
    id: 'Bank Negara',
    name: 'Bank Negara',
    lat: 3.154722,
    long: 101.693136,
  },
  {
    id: 'Kuala Lumpur',
    name: 'Kuala Lumpur',
    lat: 3.1397415,
    long: 101.6915377,
  },
  {
    id: 'KL Sentral',
    name: 'KL Sentral',
    lat: 3.134108,
    long: 101.686634,
  },
  {
    id: 'Abdullah Hukum',
    name: 'Abdullah Hukum',
    lat: 3.118733,
    long: 101.673165,
  },
  {
    id: 'Angkasapuri',
    name: 'Angkasapuri',
    lat: 3.113278,
    long: 101.673281,
  },
  {
    id: 'Pantai Dalam',
    name: 'Pantai Dalam',
    lat: 3.095637,
    long: 101.670041,
  },
  {
    id: 'Petaling',
    name: 'Petaling',
    lat: 3.086168,
    long: 101.664176,
  },
  {
    id: 'Jalan Templer',
    name: 'Jalan Templer',
    lat: 3.083468,
    long: 101.656495,
  },
  {
    id: 'Kg Dato Harun',
    name: 'Kg Dato Harun',
    lat: 3.084457,
    long: 101.632283,
  },
  {
    id: 'Seri Setia',
    name: 'Seri Setia',
    lat: 3.084521,
    long: 101.621902,
  },
  {
    id: 'Setia Jaya',
    name: 'Setia Jaya',
    lat: 3.083141,
    long: 101.611427,
  },
  {
    id: 'Subang Jaya',
    name: 'Subang Jaya',
    lat: 3.084598,
    long: 101.587392,
  },
  {
    id: 'Batu Tiga',
    name: 'Batu Tiga',
    lat: 3.075934,
    long: 101.559731,
  },
  {
    id: 'Shah Alam',
    name: 'Shah Alam',
    lat: 3.056501,
    long: 101.525085,
  },
  {
    id: 'Padang Jawa',
    name: 'Padang Jawa',
    lat: 3.052341,
    long: 101.492708,
  },
  {
    id: 'Bukit Badak',
    name: 'Bukit Badak',
    lat: 3.036166,
    long: 101.470246,
  },
  {
    id: 'Klang',
    name: 'Klang',
    lat: 3.043123,
    long: 101.449615,
  },
  {
    id: 'Teluk Pulai',
    name: 'Teluk Pulai',
    lat: 3.040854,
    long: 101.432097,
  },
  {
    id: 'Teluk Gadong',
    name: 'Teluk Gadong',
    lat: 3.033890,
    long: 101.424901,
  },
  {
    id: 'Kg Raja Uda',
    name: 'Kg Raja Uda',
    lat: 3.020121,
    long: 101.410210,
  },
  {
    id: 'Jalan Kastam',
    name: 'Jalan Kastam',
    lat: 3.013022,
    long: 101.402591,
  },
  {
    id: 'Pelabuhan Klang',
    name: 'Pelabuhan Klang',
    lat: 2.999516,
    long: 101.391449,
  },
  {
    id: 'Batu Caves',
    name: 'Batu Caves',
    lat: 3.237995,
    long: 101.681252,
  },
  {
    id: 'Taman Wahyu',
    name: 'Taman Wahyu',
    lat: 3.214494,
    long: 101.672215,
  },
  {
    id: 'Kampung Batu',
    name: 'Kampung Batu',
    lat: 3.204802,
    long: 101.675625,
  },
  {
    id: 'Batu Kentonmen',
    name: 'Batu Kentonmen',
    lat: 3.198299,
    long: 101.681217,
  },
  {
    id: 'MidValley',
    name: 'Mid Valley',
    lat: 3.118997,
    long: 101.678810,
  },
  {
    id: 'Seputeh',
    name: 'Seputeh',
    lat: 3.113685,
    long: 101.681424,
  },
  {
    id: 'Salak Selatan',
    name: 'Salak Selatan',
    lat: 3.098325,
    long: 101.704971,
  },
  {
    id: 'Bandar Tasek Selatan',
    name: 'Bandar Tasek Selatan',
    lat: 3.076277,
    long: 101.711099,
  },
  {
    id: 'Serdang',
    name: 'Serdang',
    lat: 3.023336,
    long: 101.715881,
  },
  {
    id: 'Kajang',
    name: 'Kajang',
    lat: 2.983326,
    long: 101.790650,
  },
  {
    id: 'UKM',
    name: 'UKM',
    lat: 2.939575,
    long: 101.787792,
  },
  {
    id: 'Bangi',
    name: 'Bangi',
    lat: 2.904052,
    long: 101.786128,
  },
  {
    id: 'Batang Benar',
    name: 'Batang Benar',
    lat: 2.830458,
    long: 101.826959,
  },
  {
    id: 'Nilai',
    name: 'Nilai',
    lat: 2.802248,
    long: 101.799527,
  },
  {
    id: 'Labu',
    name: 'Labu',
    lat: 2.754076,
    long: 101.826482,
  },
  {
    id: 'Tiroi',
    name: 'Tiroi',
    lat: 2.741186,
    long: 101.871927,
  },
  {
    id: 'Seremban',
    name: 'Seremban',
    lat: 2.718985,
    long: 101.940426,
  },
  {
    id: 'Senawang',
    name: 'Senawang',
    lat: 2.690400,
    long: 101.971812,
  },
  {
    id: 'Sungai Gadut',
    name: 'Sungai Gadut',
    lat: 2.660478,
    long: 101.996243,
  },
  {
    id: 'Rembau',
    name: 'Rembau',
    lat: 2.592355,
    long: 102.095319,
  },
  {
    id: 'Pulau Sebang',
    name: 'Pulau Sebang/Tampin',
    lat: 2.463866,
    long: 102.226278,
  },
];

export function getStations() {
  const result = [];
  stations.forEach((s) => {
    const { id, name, lat, long } = s;
    const station = { id, name, lat, long };
    station.conjunction = false;
    const line1Order = line1.indexOf(id);
    const line2Order = line2.indexOf(id);
    if (line1Order >= 0 && line2Order >= 0) {
      station.conjunction = true;
      station.lines = [
        {
          id,
          line: 1,
          order: line1Order,
        },
        {
          id,
          line: 2,
          order: line2Order,
        },
      ];
    } else if (line1Order >= 0) {
      station.line = 1;
      station.order = line1Order;
    } else if (line2Order >= 0) {
      station.line = 2;
      station.order = line2Order;
    }
    result.push(station);
  });
  // console.log('result', result);
  return result;
}

export function getLineName(lineNum) {
  switch (lineNum) {
    case 1:
      return 'Tg. Malim - Pel. Klang';
    case 2:
      return 'Batu Caves - Tampin';
    default:
      return '';
  }
}

export function isEkspresTrain(trainNo) {
  return trainNo === 2602 || trainNo === 2603;
}
