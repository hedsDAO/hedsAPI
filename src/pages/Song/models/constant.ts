import { Song, User, Tape } from '@/models/common';

export const mockSong: Song = {
  id: 11,
  tape_id: 13,
  audio: 'https://www.heds.cloud/ipfs/QmWvSojHfBGqRSmyL9xADgxWwyKBnmoFTj8VU1rniAohFf',
  cover: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
  duration: 89.440998,
  public: true,
  track_name: null,
  type: 'track',
  submission_data:
    '{"sub_id": "roomyCROCODILE", "sub_image": "https://www.heds.cloud/ipfs/QmTcgv9skPrRX9uA6w5UvVYga2S6FKLouV7fgcPi8Buv9L", "proposalId": "bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha"}',
  cyanite_id: '14064202',
  created: null,
  total_likes: null,
  track_data: '{"track_no": 3, "video": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/promo%2Fartists%2FcoldOPOSSUM0001-1680.mp4?alt=media&token=de5a9ba6-2ebb-4610-b3f0-bd3fb976a64b"}',
};

export const mockArtist: User = {
  id: 21,
  profile_picture:
    'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/profilePictures%2F0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a.jpeg?alt=media&token=ee81597e-2901-41b2-8838-44e6102142a4',
  banner:
    'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/banners%2F0x000000000000000000000000000000.png?alt=media&token=c2e9c947-5965-4d77-b0c3-047c2bc125d3',
  twitter_handle: '_envimusic',
  badges:
    '[{"name": "Visitor", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1", "description": "Welcome to heds."}, {"name": "Artist", "image": "https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/badges%2Fartist.png?alt=media&token=c2fd8ddf-a23e-4f46-8c51-d725b78639f7", "description": "Appear on a curated tape."}]',
  description: '',
  display_name: 'envi',
  role: 'artist',
  wallet: '0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a',
  joined: 1.6514928e12,
  spotlight: null,
  collection:
    '{"items": {"0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41": {"id": "3", "name": "hedsTAPE 03", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F3.png?alt=media&token=5413c9e1-753a-4c74-8b24-823d78aba1e6", "space": "heds", "quantity": 1}, "0x8f36eB094F7B960a234a482d4d8FFb8b37f728C6": {"id": "5", "name": "hedsTAPE 05", "tape": "hedstape", "image": "https://firebasestorage.googleapis.com/v0/b/hedsdev.appspot.com/o/covers%2Fhedstape%2F5.png?alt=media&token=3a94898c-e05a-4c06-8b1b-11150bfd0c98", "space": "heds", "quantity": 1}, "0xeeb431caa15b526f48ee4db3697fe57ec8223a8e": {"id": "goodsociety", "name": "Good Society", "tape": "collabtape", "image": "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2FcollabTAPES%2FGood%20Society%2FImages%2FGSCOVER.png?alt=media&token=f93e25d3-e8f2-4c4d-9e1f-25c8b3bd99e5", "space": "heds", "quantity": 1}}, "lastUpdated": 1675547094154}',
  votes:
    '{"heds": {"hedstape": {"7": {"vp": 11, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"3": {"choice": {"id": 2, "name": "plantWILDCAT", "image": "https://www.heds.cloud/ipfs/Qmf45uU6DfZuEgpHPF6tmbG68T6FzC6coiWJxeyeg8WTtF", "media": "https://www.heds.cloud/ipfs/Qmc6Qbyoo8XqNX9aJjQK9CP2CwcDukuWk4m5Ap8d12UEKC", "artist": "_envimusic", "location": "heds/hedstape/7", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 11}, "7": {"choice": {"id": 6, "name": "hospitableWILDCAT", "image": "https://www.heds.cloud/ipfs/Qmf3MwkPgt2fuSTkXySeyGDcdkviP5oxAAbmoDVw1H7Rzv", "media": "https://www.heds.cloud/ipfs/QmQ4Zaxe69P9eqYfQw7AQe71DvyXHdC7NHMFovhvwDYrxr", "artist": "iamkabuki", "location": "heds/hedstape/7", "walletId": "0x2b4706043ba86aeea7395942404a82cc6ee3e861"}, "weight": 1}, "13": {"choice": {"id": 12, "name": "impoliteHARE", "image": "https://www.heds.cloud/ipfs/QmWkBKSg2Gb1pG79nrUnTygikKwyakyEFYei8LisPfrmt1", "media": "https://www.heds.cloud/ipfs/QmQ61X77h47kNkFdZHQaVWnLAz5WNp1TmjG3Qcus9UNqoC", "artist": "maxfryy", "location": "heds/hedstape/7", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 3}, "16": {"choice": {"id": 15, "name": "magicalBURRO", "image": "https://www.heds.cloud/ipfs/QmcPk8j2TVbFog26NxEW2ttNFk66pbLvNjUprVs3LWY4hG", "media": "https://www.heds.cloud/ipfs/QmYEZfVXMb4GyNLysU5MzJnAtHrUi8dV8YmhEon5nybVey", "artist": "_harriscole", "location": "heds/hedstape/7", "walletId": "0x8e09b494f20aeadb8d9b3c8b3bec7cb6c7e18e83"}, "weight": 0}}, "created": 1660234329}, "8": {"vp": 26, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"1": {"choice": {"id": 0, "name": "seriousERMINE", "image": "https://www.heds.cloud/ipfs/QmXhMPstjbX2dM3Z1gxnKZrKKWs8ZibQk4QEGsU7k1JERM", "media": "https://www.heds.cloud/ipfs/QmRYMjDCCj8g9MEVVW585MJEChgshQUSvbK76FH5tAfkcW", "artist": "_envimusic", "location": "heds/hedstape/8", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 5}, "5": {"choice": {"id": 4, "name": "aquaticORYX", "image": "https://www.heds.cloud/ipfs/QmbMiC2SkNPyNBPYFwTWpK17JQt72LtC1KSa76D8nogimr", "media": "https://www.heds.cloud/ipfs/QmbwCZvfdniM6eRu3u1jzCaigC8gNo3KqALHfpmychZ5jC", "artist": "mrmarstoday", "location": "heds/hedstape/8", "walletId": "0x57c32b6ed10c90ee448e87b888608465ff7711b5"}, "weight": 3}, "6": {"choice": {"id": 5, "name": "mercifulCIVET", "image": "https://www.heds.cloud/ipfs/QmeCiiyF7ezoXAj5VmWHQBNH2nGmoFsz3cEGuccvC7QKWi", "media": "https://www.heds.cloud/ipfs/QmXvpW67hoPpPTS2YWQ479qK8Ly3KdQKrNufiNNbF4jt3d", "artist": "maxfryy", "location": "heds/hedstape/8", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 5}, "16": {"choice": {"id": 15, "name": "enthusiasticFISH", "image": "https://www.heds.cloud/ipfs/QmdyCGsZSNUxV65BacUiC8D2U3TkNWjcK983AtNoSStUTK", "media": "https://www.heds.cloud/ipfs/QmSBHMwYCBxGmZjXqydNE38qMZqeGa4k8Bsq5jXYCNnumx", "artist": "alloveprod", "location": "heds/hedstape/8", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 3}, "17": {"choice": {"id": 16, "name": "modernHARTEBEEST", "image": "https://www.heds.cloud/ipfs/QmdYgVj8o7scqgeAvRKxHisU6rxLoSk2EF8Mmdy3givFCZ", "media": "https://www.heds.cloud/ipfs/QmXRGaE5LUCK7v8fjAyt51bqRuqezNppRbpJjwxekAmkz6", "artist": "robumusic", "location": "heds/hedstape/8", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 5}}, "created": 1663650096}, "9": {"vp": 26, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"1": {"choice": {"id": 0, "name": "abidingRAT", "image": "https://www.heds.cloud/ipfs/QmRD6BaC1487FmfWzAWghTfF828sXxsVGUt1YZtVb1sSNc", "media": "https://www.heds.cloud/ipfs/QmZSpS8aLB7tUeCdmBWQsz45yi9uQysHNach2V98vEQUng", "artist": "_envimusic", "location": "heds/hedstape/9", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 4}, "9": {"choice": {"id": 8, "name": "nostalgicLOVEBIRD", "image": "https://www.heds.cloud/ipfs/QmSra2Ni6bhv7oR2D5SpmJXDWoFnY7jb38QQ9Bp5SCbAKL", "media": "https://www.heds.cloud/ipfs/QmPMmixLJ1sPmojSWAW1MVJggQxoeMy958atiqNadnpUoL", "artist": "maxfryy", "location": "heds/hedstape/9", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 4}, "18": {"choice": {"id": 17, "name": "wickedCHAMELEON", "image": "https://www.heds.cloud/ipfs/QmW1z5ANa47vnrtZvC2gqpSnnoKLYpUab3QKCr7rPXr8ge", "media": "https://www.heds.cloud/ipfs/QmWP6o1uznedpPD6goJyqzxQiyd4okAFc9FoaQogwMQSQH", "artist": "alloveprod", "location": "heds/hedstape/9", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 4}, "19": {"choice": {"id": 18, "name": "plasticCOUGAR", "image": "https://www.heds.cloud/ipfs/QmeJPYZGU6PrfTscAhqZcx45t8tm2VLvGSUpXGVsYB1JHh", "media": "https://www.heds.cloud/ipfs/QmTz1RkutPMY2Gxap12rkfoWQZwj3b1yD14ubXHGUEd5Ys", "artist": "robumusic", "location": "heds/hedstape/9", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 4}, "23": {"choice": {"id": 22, "name": "fumblingORANGUTAN", "image": "https://www.heds.cloud/ipfs/QmdTsmfuim54HKdntWGe72LJXZJyi7goypuuHSg8nGqFhS", "media": "https://www.heds.cloud/ipfs/Qma8kpfjdHjek9wbNWNzWsDfv1LWQtfRhgzmXJVgJipJh9", "artist": "madimakesmusica", "location": "heds/hedstape/9", "walletId": "0xd68892aed5b3a9b1e419b8a2c0d2c6a9c17d7679"}, "weight": 4}, "27": {"choice": {"id": 26, "name": "wide-eyedAPE", "image": "https://www.heds.cloud/ipfs/QmfDVe3N91ZCp6RAzDGhpisDNZVkPHJoUEfk9CB9eC4aJg", "media": "https://www.heds.cloud/ipfs/QmZoTXDMDPAUNft2XQWzTEwg4VgL6UpNAkmaKj8SSwYfEB", "artist": "haiSem0r", "location": "heds/hedstape/9", "walletId": "0xf5099efa89868b49b7a9ae0b6d86139fe6acb04f"}, "weight": 4}, "28": {"choice": {"id": 27, "name": "fourHORSE", "image": "https://www.heds.cloud/ipfs/Qmeb2uTmcdiF9nFikYfh2BghAy2JBFdNVeqDF526jG8Z2a", "media": "https://www.heds.cloud/ipfs/QmfSH2gaZw12P6wpk8e8apGYq7DPVhbBCSW3foJAyCEmBZ", "artist": "whoispham", "location": "heds/hedstape/9", "walletId": "0xf50f785fba275ac052d9c4137d3fd7a4de5681e5"}, "weight": 4}}, "created": 1666040571}, "10": {"vp": 26, "voter": "0x09AdB5a9D058fc8A647b7EC113BA24ffbb0cc25A", "choice": {"1": {"choice": {"id": 0, "name": "coldOPOSSUM", "image": "https://www.heds.cloud/ipfs/QmUwpHb3aimtH73N1YVggdhcoqmb6oJWds6qDVnkijsvGY", "media": "https://www.heds.cloud/ipfs/QmPp1yJ2mk2JChzuiM5iinkMwQeZeqV6quFcY1zwH79LPH", "artist": "_envimusic", "location": "heds/hedstape/10", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 2}, "4": {"choice": {"id": 3, "name": "sordidSHREW", "image": "https://www.heds.cloud/ipfs/QmXR9KtYvRtMGxqvbmh5XbbgPFw84S3jkijPJZxaLroKcr", "media": "https://www.heds.cloud/ipfs/QmX3wA1LeFHi2F6xSndrzsmJkzkGCecpGETAmsHs4Pq8Kk", "artist": "HanzBeats", "location": "heds/hedstape/10", "walletId": "0x1e75586b064ac038b13a9f8c6bfb99e64d8b3e62"}, "weight": 2}, "5": {"choice": {"id": 4, "name": "lackadaisicalAPE", "image": "https://www.heds.cloud/ipfs/QmR4VfndHG3vRrtPx7JfUTmJh3ZsY5bksf56BXZwyEbRA8", "media": "https://www.heds.cloud/ipfs/QmZ3HHAu5g1jR73cAWo6iwxe8bVV8RnTnedg4qjM8qD8yp", "artist": "boyapocalypse_", "location": "heds/hedstape/10", "walletId": "0x329fdb9d6eba98a6159a75edaae6f86f382a65b0"}, "weight": 2}, "9": {"choice": {"id": 8, "name": "longingHYENA", "image": "https://www.heds.cloud/ipfs/QmNyKLw6tYP5oiJe6k4yJzid46aCPZ4R1hnSYYCKwK9wSB", "media": "https://www.heds.cloud/ipfs/QmUw2FNXPa8tyPLdBht2t2W5NhXot2ou7rx82aQcadsi5F", "artist": "maxfryy", "location": "heds/hedstape/10", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 2}, "10": {"choice": {"id": 9, "name": "classyWARTHOG", "image": "https://www.heds.cloud/ipfs/QmP2QxH5xGyPeeWX1YYvtbdGRJgVZrGXzdzWGUcXMYLBNt", "media": "https://www.heds.cloud/ipfs/QmeQtZu66oABGfqp4BbaC3phPw2BQavGUnNN2apdy3YNy4", "artist": "therobyguy", "location": "heds/hedstape/10", "walletId": "0x8095b40cb745d9c5f66685b46c73cd66afe48166"}, "weight": 2}, "11": {"choice": {"id": 10, "name": "vacuousPUMA", "image": "https://www.heds.cloud/ipfs/QmUJLPf6f6BT8uQvxESWEDvSWXHnhoyLqKsbt9AG2zWBpV", "media": "https://www.heds.cloud/ipfs/QmRDWUobjgiXdg5rSoPazHws6qjFzhZuj3LEAU9Dz8htCn", "artist": "tsanch_1", "location": "heds/hedstape/10", "walletId": "0x8480e77b3df1d804efdc4ed537be189ea91a761b"}, "weight": 2}, "15": {"choice": {"id": 14, "name": "wearyGNU", "image": "https://www.heds.cloud/ipfs/QmXxjmLJNYhWrRb3uNaGiXV96Lo6gX1uhTAxLGtGLfnVr2", "media": "https://www.heds.cloud/ipfs/QmYM9EZwWoxTJojuWuPrrHaEY3V9gvb8G66r63dZAHvaYC", "artist": "iamgeorgehooks", "location": "heds/hedstape/10", "walletId": "0xb9c18a66a45ee459ecffb7feb44b32665230d677"}, "weight": 2}, "16": {"choice": {"id": 15, "name": "messyCOATI", "image": "https://www.heds.cloud/ipfs/Qmadxr2zufQJyEeU9Kec57XsYfYc8babZBRyQnBxdP8JLD", "media": "https://www.heds.cloud/ipfs/Qmdc4PGoi5KVsncAYDvxqCVjgrLT4kUX5j1KZqMqa4grP4", "artist": "DeffieDeff", "location": "heds/hedstape/10", "walletId": "0xbb81e31f69181c5b74c126d8cc2b036801af04b8"}, "weight": 2}, "17": {"choice": {"id": 16, "name": "unhealthyRACCOON", "image": "https://www.heds.cloud/ipfs/QmSd3XwxaK8WWbxJNYk32QLS8x62qypHKs1bWiyX8chxzv", "media": "https://www.heds.cloud/ipfs/QmNZh86gtNtHmPcVRm1iBjjjz2N8SfLXaEVepo49M7JXLZ", "artist": "cravewav", "location": "heds/hedstape/10", "walletId": "0xc1ff40db9e85a45f684d881c9925bc3308e69187"}, "weight": 2}, "18": {"choice": {"id": 17, "name": "fearlessSTALLION", "image": "https://www.heds.cloud/ipfs/QmXCxX3zmx1QmsaRFV4EYWQ8mzfFdNXhZstqappgUpUJ2E", "media": "https://www.heds.cloud/ipfs/QmSDq4hSKmqtVz7pkWjy7z7XS64kxuE89375L4LzPDBjrP", "artist": "alloveprod", "location": "heds/hedstape/10", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 2}, "19": {"choice": {"id": 18, "name": "teeny-tinyAARDVARK", "image": "https://www.heds.cloud/ipfs/Qmbg21dTj9JufBeNdPT134eNTBxw2xLTsEtSNA4pJQLUjV", "media": "https://www.heds.cloud/ipfs/QmS6Bxq1qQirKzASTeMcdjNo5EBovNxrpjrtKRU4Zb7cLk", "artist": "robumusic", "location": "heds/hedstape/10", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 2}, "22": {"choice": {"id": 21, "name": "levelSHEEP", "image": "https://www.heds.cloud/ipfs/QmZvZvVYiDfrKxFtQCZB4N3mJALVae7pgzrk7gTgYYJZAG", "media": "https://www.heds.cloud/ipfs/QmTYxLMZvt7n7vaZouRNA2XwzFVXQ9kziFwLvYgif33WhW", "artist": "haiSem0r", "location": "heds/hedstape/10", "walletId": "0xf5099efa89868b49b7a9ae0b6d86139fe6acb04f"}, "weight": 2}}, "created": 1669181369}, "11": {"vp": 27, "voter": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a", "choice": {"1": {"choice": {"id": 0, "name": "roomyCROCODILE", "image": "https://www.heds.cloud/ipfs/QmTcgv9skPrRX9uA6w5UvVYga2S6FKLouV7fgcPi8Buv9L", "media": "https://www.heds.cloud/ipfs/QmWvSojHfBGqRSmyL9xADgxWwyKBnmoFTj8VU1rniAohFf", "artist": "envi", "location": "hed/hedstape/11", "walletId": "0x09adb5a9d058fc8a647b7ec113ba24ffbb0cc25a"}, "weight": 5}, "3": {"choice": {"id": 2, "name": "numerousALLIGATOR", "image": "https://www.heds.cloud/ipfs/QmWedvk6vA7HPskN4FxUsQEEXw7Ghc2aFgejaJmZuJup1Y", "media": "https://www.heds.cloud/ipfs/QmPRzQiAgQjew43tHuetDt6FqdHZG4y3gXumYN5yKT3cEf", "artist": "HOUNDTRACK", "location": "hed/hedstape/11", "walletId": "0x17c72771bb6b283bade0c07e0901744c37ff8c41"}, "weight": 1}, "12": {"choice": {"id": 11, "name": "sturdyBASILISK", "image": "https://www.heds.cloud/ipfs/QmUaHBdy7QDGD6QsPQzE62UoQnaSBvrMCyoov3WzpkeatP", "media": "https://www.heds.cloud/ipfs/QmXHwQebEQMU6MyKwQ8jkkuR86nAJJ3AqZ4xbXQ72bBZYr", "artist": "max fry", "location": "hed/hedstape/11", "walletId": "0x6822d2d69508a086d4c329ea8969484b62cc0f94"}, "weight": 5}, "14": {"choice": {"id": 13, "name": "relievedJACKAL", "image": "https://www.heds.cloud/ipfs/QmPqihqBwtYf5tWjQr11oqgKeV7a5BQw9TDGFrBL27zFp6", "media": "https://www.heds.cloud/ipfs/QmPtv74EyYMq9fuBeZYku3vcEy4STBdcBDpd4HpZKcH47N", "artist": "TSheds", "location": "hed/hedstape/11", "walletId": "0x8480e77b3df1d804efdc4ed537be189ea91a761b"}, "weight": 5}, "21": {"choice": {"id": 20, "name": "alertGORILLA", "image": "https://www.heds.cloud/ipfs/QmNWHGdFafPd68542oFCogswprucPTt2ZdBsZjamohp84p", "media": "https://www.heds.cloud/ipfs/QmYgrHEiiTTwSkJUUDDYbnH5dbHoCoGRMRU36ssXBEjHtT", "artist": "allove", "location": "hed/hedstape/11", "walletId": "0xc2c398a78d334325f1795cb09a513f87e27cf42e"}, "weight": 1}, "22": {"choice": {"id": 21, "name": "livelyOCTOPUS", "image": "https://www.heds.cloud/ipfs/QmZNnd3FNSdTvUhY7veeMFmZRipxsEGB5AZotZ4RdnrpQs", "media": "https://www.heds.cloud/ipfs/QmXo7RQ4duGFhDPnxwnSd5261FnZNDxsEMbTLVuRbgSrHJ", "artist": "robu", "location": "hed/hedstape/11", "walletId": "0xc378d995d8c687ddc1be3094dd243e34097ad81e"}, "weight": 1}}, "created": 1676408168897, "signature": "0x40168673ad2d349c107ceb50dcded53e3f1cfffb811ccdbca6fdad65d17ca98a143fb482930519fa7aa12a61a529872f4c91a3b260ea5f9cffb72d1f0555a03f1b"}}}}',
};

export const mockTape: Tape = {
  id: 13,
  contract: '0xfDF7D7FFe3D363f858644057EBC62afABb99152A',
  name: 'hedsTAPE 11',
  merkle_root: '0x41F60DCB50D15915AE00B4F0C480C469F51F2A5A3D38B1B6BA54DBFD29C97334',
  description:
    'MIJA has offered her inimitable take on a wide variety of electronic projects over the years. Accordingly, for a collaborative partner of such creative versatility, Mija’s version of the hedsTAPE sample was recorded at the Vintage Synthesizer Museum, an electronic music recording studio located in Highland Park, CA. The sample includes recordings from an original TR-808, a Moog MiniMoog Model D, a Yamaha CS-80 and more. Sounds were recorded through a Universal Audio Apollo 16.',
  image: 'https://firebasestorage.googleapis.com/v0/b/heds-104d8.appspot.com/o/covers%2Fhedstape%2F11.png?alt=media&token=0be0d2b0-bf12-4720-8b24-d0b48323c0a2',
  proposal_id: 'bafkreia5ntoe6avw4r7kc55xkhr2qgngor6vnn22rnxrmfvmbkeybkb2ha',
  video: 'https://www.heds.cloud/ipfs/QmPgvakDVJ7eXbTazFKaXDStJz7xWNfpo4Vm1VGC5j1Qsf',
  bpm: 161,
  timeline:
    '{"mint": {"end": 1677355200000, "start": 1677268800000}, "vote": {"end": 1676750400000, "start": 1676404800000}, "submit": {"end": 1676235600000, "start": 1675540800000}, "premint": {"end": 1677268785000, "start": 1677189600000}}',
  type: 'hedstape',
  splits: '',
  links: '{}',
};
