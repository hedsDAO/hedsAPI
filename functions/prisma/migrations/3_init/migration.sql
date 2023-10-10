-- CreateEnum
CREATE TYPE "song_type" AS ENUM ('submission', 'track', 'collab', 'sample', 'devolo');

-- CreateEnum
CREATE TYPE "tape_market_type" AS ENUM ('opensea', 'sound');

-- CreateEnum
CREATE TYPE "tape_type" AS ENUM ('legacy', 'devtape', 'collabtape');

-- CreateEnum
CREATE TYPE "user_role_type" AS ENUM ('user', 'artist', 'admin');

-- CreateEnum
CREATE TYPE "method_enum" AS ENUM ('linear', 'quadratic', 'single choice');

-- CreateEnum
CREATE TYPE "state_enum" AS ENUM ('pending', 'open', 'closed');

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
    "email" VARCHAR,
    "phone_number" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "choices" (
    "id" INTEGER NOT NULL,
    "proposal_id" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "artist" VARCHAR(255),
    "name" VARCHAR(255),
    "location" VARCHAR(255),
    "media" VARCHAR(255),
    "user_id" INTEGER,

    CONSTRAINT "choices_pkey" PRIMARY KEY ("id","proposal_id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "ipfs_hash" VARCHAR(255) NOT NULL,
    "space_id" INTEGER,
    "signature" VARCHAR(255),
    "author" INTEGER,
    "start_time" TIMESTAMP(6),
    "end_time" TIMESTAMP(6),
    "block" INTEGER,
    "method" "method_enum",
    "title" TEXT,
    "description" TEXT,
    "scores" DOUBLE PRECISION[],
    "created_at" TIMESTAMP(6),
    "cover" VARCHAR,
    "choice_type" VARCHAR,
    "show_results" BOOLEAN,
    "is_web3" BOOLEAN,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("ipfs_hash")
);

-- CreateTable
CREATE TABLE "spaces" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6),
    "image" VARCHAR,
    "description" VARCHAR,
    "banner" VARCHAR,
    "twitter" VARCHAR,
    "instagram" VARCHAR,
    "soundcloud" VARCHAR,
    "discord" VARCHAR,

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategies" (
    "id" SERIAL NOT NULL,
    "proposal_id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "params" JSONB,
    "network" INTEGER,

    CONSTRAINT "strategies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_choices" (
    "vote_id" INTEGER NOT NULL,
    "choice_id" INTEGER NOT NULL,
    "proposal_id" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "vote_choices_pkey" PRIMARY KEY ("vote_id","choice_id","proposal_id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" SERIAL NOT NULL,
    "signature" VARCHAR(255) NOT NULL,
    "created" TIMESTAMP(6) NOT NULL,
    "vp" INTEGER NOT NULL,
    "voter" INTEGER NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_authors" (
    "user_id" INTEGER NOT NULL,
    "space_id" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "space_authors_pkey" PRIMARY KEY ("user_id","space_id")
);

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

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("ipfs_hash") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "fk_choices_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("ipfs_hash") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vote_choices" ADD CONSTRAINT "fk_vote_choices_proposals" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("ipfs_hash") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vote_choices" ADD CONSTRAINT "vote_choices_choice_id_proposal_id_fkey" FOREIGN KEY ("choice_id", "proposal_id") REFERENCES "choices"("id", "proposal_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vote_choices" ADD CONSTRAINT "vote_choices_vote_id_fkey" FOREIGN KEY ("vote_id") REFERENCES "votes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "fk_votes_voter" FOREIGN KEY ("voter") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "space_authors" ADD CONSTRAINT "space_authors_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "space_authors" ADD CONSTRAINT "space_authors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

