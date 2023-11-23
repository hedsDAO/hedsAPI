-- CreateEnum
CREATE TYPE "user_role_type" AS ENUM ('user', 'artist', 'admin');

-- CreateTable
CREATE TABLE "likes" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "song_id" INTEGER,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listening_history" (
    "id" INTEGER NOT NULL,
    "user_id" INTEGER,
    "song_id" INTEGER,
    "last_played" TIMESTAMP(6),

    CONSTRAINT "listening_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "song_artists" (
    "id" INTEGER NOT NULL,
    "song_id" INTEGER,
    "user_id" INTEGER,
    "verified" BOOLEAN,
    "ownership_percent" DOUBLE PRECISION,

    CONSTRAINT "song_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "songs" (
    "id" INTEGER NOT NULL,
    "tape_id" INTEGER,
    "audio" VARCHAR,
    "cover" VARCHAR,
    "duration" DOUBLE PRECISION,
    "public" BOOLEAN,
    "track_name" VARCHAR,
    "type" VARCHAR,
    "submission_data" JSONB,
    "cyanite_id" VARCHAR,
    "created" TIMESTAMP(6),
    "total_likes" INTEGER,
    "track_data" JSONB,
    "video" VARCHAR,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tape_sample_artists" (
    "id" INTEGER NOT NULL,
    "tape_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "tape_sample_artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tapes" (
    "id" INTEGER NOT NULL,
    "contract" VARCHAR,
    "name" VARCHAR,
    "merkle_root" VARCHAR,
    "description" VARCHAR,
    "image" VARCHAR,
    "proposal_id" VARCHAR,
    "video" VARCHAR,
    "bpm" INTEGER,
    "timeline" JSONB,
    "type" VARCHAR,
    "splits" VARCHAR,
    "links" JSONB,

    CONSTRAINT "tapes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "profile_picture" VARCHAR,
    "banner" VARCHAR,
    "twitter_handle" VARCHAR,
    "badges" JSONB,
    "description" TEXT,
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
    "method" VARCHAR,
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
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "image" VARCHAR,
    "description" VARCHAR,
    "banner" VARCHAR,
    "twitter" VARCHAR,
    "instagram" VARCHAR,
    "soundcloud" VARCHAR,
    "discord" VARCHAR,
    "created_at" BIGINT,

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategies" (
    "id" INTEGER NOT NULL,
    "proposal_id" VARCHAR(255),
    "name" VARCHAR(255),
    "params" JSONB,
    "network" INTEGER,

    CONSTRAINT "strategies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_choices" (
    "vote_id" INTEGER NOT NULL,
    "choice_id" INTEGER NOT NULL,
    "proposal_id" VARCHAR(255) NOT NULL,
    "amount" INTEGER,

    CONSTRAINT "vote_choices_pkey" PRIMARY KEY ("vote_id","choice_id","proposal_id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" INTEGER NOT NULL,
    "signature" VARCHAR(255),
    "created" TIMESTAMP(6),
    "vp" INTEGER,
    "voter" INTEGER,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "space_authors" (
    "user_id" INTEGER,
    "space_id" INTEGER,
    "id" INTEGER NOT NULL,

    CONSTRAINT "space_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_comments" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_rsvps" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_waitlists" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_waitlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "location" VARCHAR(255) NOT NULL,
    "start_time" TIMESTAMP(6) NOT NULL,
    "end_time" TIMESTAMP(6) NOT NULL,
    "image" VARCHAR(255),
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_song_id_fk" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listening_history" ADD CONSTRAINT "listening_history_song_id_fk" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listening_history" ADD CONSTRAINT "listening_history_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_artists" ADD CONSTRAINT "song_artists_song_id_fk" FOREIGN KEY ("song_id") REFERENCES "songs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "song_artists" ADD CONSTRAINT "song_artists_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tape_sample_artists" ADD CONSTRAINT "tape_sample_artists_tape_id_fk" FOREIGN KEY ("tape_id") REFERENCES "tapes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tape_sample_artists" ADD CONSTRAINT "tape_sample_artists_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "choices_proposal_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("ipfs_hash") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "choices" ADD CONSTRAINT "fk_choices_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_fk" FOREIGN KEY ("author") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "proposals" ADD CONSTRAINT "proposals_space_id_fk" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_proposal_id_fk" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("ipfs_hash") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vote_choices" ADD CONSTRAINT "fk_vote_choices_proposals" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("ipfs_hash") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "fk_votes_voter" FOREIGN KEY ("voter") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "space_authors" ADD CONSTRAINT "space_authors_space_id_fk" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "space_authors" ADD CONSTRAINT "space_authors_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_comments" ADD CONSTRAINT "event_comments_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_comments" ADD CONSTRAINT "event_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_rsvps" ADD CONSTRAINT "event_rsvps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_waitlists" ADD CONSTRAINT "event_waitlists_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "event_waitlists" ADD CONSTRAINT "event_waitlists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

