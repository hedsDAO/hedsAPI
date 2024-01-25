-- CreateEnum
CREATE TYPE "song_type" AS ENUM ('submission', 'track', 'collab', 'sample', 'hedsolo');

-- CreateEnum
CREATE TYPE "tape_market_type" AS ENUM ('opensea', 'sound');

-- CreateEnum
CREATE TYPE "tape_type" AS ENUM ('legacy', 'hedstape', 'collabtape');

-- CreateEnum
CREATE TYPE "user_role_type" AS ENUM ('user', 'artist', 'admin');

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "song_id" INTEGER,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listening_history" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "song_id" INTEGER,
    "last_played" TIMESTAMP(6),

    CONSTRAINT "listening_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song_artists" (
    "id" SERIAL NOT NULL,
    "song_id" INTEGER,
    "user_id" INTEGER,
    "verified" BOOLEAN,
    "ownership_percent" DOUBLE PRECISION,

    CONSTRAINT "song_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song_events" (
    "id" SERIAL NOT NULL,
    "song_id" INTEGER,
    "user_id" INTEGER,
    "event_type" VARCHAR(255),
    "event_data" JSONB,
    "event_timestamp" TIMESTAMP(6),

    CONSTRAINT "song_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "tape_id" INTEGER,
    "audio" VARCHAR,
    "cover" VARCHAR,
    "duration" DOUBLE PRECISION,
    "public" BOOLEAN,
    "track_name" VARCHAR,
    "type" "song_type",
    "submission_data" JSONB,
    "cyanite_id" VARCHAR,
    "created" TIMESTAMP(6),
    "total_likes" INTEGER,
    "track_data" JSONB,
    "video" VARCHAR,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tape_events" (
    "id" SERIAL NOT NULL,
    "tape_id" INTEGER,
    "user_id" INTEGER,
    "event_type" VARCHAR(255),
    "event_data" JSONB,
    "event_timestamp" TIMESTAMP(6),

    CONSTRAINT "tape_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tape_sample_artists" (
    "id" SERIAL NOT NULL,
    "tape_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "tape_sample_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tapes" (
    "id" SERIAL NOT NULL,
    "contract" VARCHAR,
    "name" VARCHAR,
    "merkle_root" VARCHAR,
    "description" VARCHAR,
    "image" VARCHAR,
    "proposal_id" VARCHAR,
    "video" VARCHAR,
    "bpm" INTEGER,
    "timeline" JSONB,
    "type" "tape_type",
    "splits" VARCHAR,
    "links" JSONB,

    CONSTRAINT "tapes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_events" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "event_type" VARCHAR(255),
    "event_data" JSONB,
    "event_timestamp" TIMESTAMP(6),

    CONSTRAINT "user_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_generations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "cyanite_id" INTEGER NOT NULL,
    "audio" TEXT NOT NULL,
    "image" TEXT,
    "prompt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT,
    "cyanite_data" JSONB,
    "created_at" TIMESTAMP(6),

    CONSTRAINT "user_generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "profile_picture" VARCHAR,
    "banner" VARCHAR,
    "twitter_handle" VARCHAR,
    "badges" JSONB,
    "description" VARCHAR,
    "display_name" VARCHAR,
    "role" "user_role_type",
    "wallet" VARCHAR,
    "joined" DOUBLE PRECISION,
    "spotlight" VARCHAR,
    "collection" JSONB,
    "votes" JSONB,
    "email" VARCHAR,
    "phone_number" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_wallet_key" ON "users"("wallet");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listening_history" ADD CONSTRAINT "listening_history_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listening_history" ADD CONSTRAINT "listening_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_artists" ADD CONSTRAINT "song_artists_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_artists" ADD CONSTRAINT "song_artists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_events" ADD CONSTRAINT "song_events_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_events" ADD CONSTRAINT "song_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tape_events" ADD CONSTRAINT "tape_events_tape_id_fkey" FOREIGN KEY ("tape_id") REFERENCES "tapes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tape_events" ADD CONSTRAINT "tape_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tape_sample_artists" ADD CONSTRAINT "tape_sample_artists_tape_id_fkey" FOREIGN KEY ("tape_id") REFERENCES "tapes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tape_sample_artists" ADD CONSTRAINT "tape_sample_artists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_events" ADD CONSTRAINT "user_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

