//4k Encode
/*
ffmpeg -i mp4/videos/hedsRadio/Salenie_hedsRADIO_FINAL.mov \
  -c copy \
  -hls_time 5 -hls_list_size 0 \
  -hls_segment_filename "m3u8/hedsRadio/009-SALENIE/4k/fileSequence%05d.ts" \
*/

//1080p Encode
/*
ffmpeg -i mp4/videos/hedsRadio/Salenie_hedsRADIO_FINAL.mov \
-vf "scale=1920:1080" -c:v libx264 -b:v 5000k -c:a aac -ar 48000 -b:a 128k \
-hls_time 5 -hls_list_size 0 -hls_segment_filename "m3u8/hedsRadio/009-SALENIE/1080p/fileSequence%05d.ts" \
-f hls m3u8/hedsRadio/009-SALENIE/1080p.m3u8
*/

//720p Encode
/*
ffmpeg -i mp4/videos/hedsRadio/Salenie_hedsRADIO_FINAL.mov \
-vf "scale=1280:720" -c:v libx264 -b:v 2500k -c:a aac -ar 48000 -b:a 128k \
-hls_time 5 -hls_list_size 0 -hls_segment_filename "m3u8/hedsRadio/009-SALENIE/720p/fileSequence%05d.ts" \
-f hls m3u8/hedsRadio/009-SALENIE/720p.m3u8
*/
