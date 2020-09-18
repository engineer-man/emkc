up:
drop table code_rooms;
drop table comment_votes;
drop table comments;
drop table notifications;
drop table question_tags;
drop table question_votes;
drop table questions;
drop table video_request_votes;
drop table video_requests;

down:
CREATE TABLE `code_rooms` (
  `code_room_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `hash` varchar(40) NOT NULL,
  `code` mediumtext NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`code_room_id`),
  KEY `user_id` (`user_id`),
  KEY `hash` (`hash`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=274 DEFAULT CHARSET=utf8;

CREATE TABLE `comment_votes` (
  `comment_vote_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `value` tinyint(4) NOT NULL,
  PRIMARY KEY (`comment_vote_id`),
  KEY `comment_id` (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `value` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=372 DEFAULT CHARSET=utf8;

CREATE TABLE `comments` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int(10) unsigned NOT NULL,
  `base_id` int(10) unsigned DEFAULT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `comment` mediumtext NOT NULL,
  `depth` int(11) NOT NULL DEFAULT '0',
  `score` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `question_id` (`question_id`),
  KEY `base_id` (`base_id`),
  KEY `parent_id` (`parent_id`),
  KEY `user_id` (`user_id`),
  KEY `depth` (`depth`),
  KEY `score` (`score`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=316 DEFAULT CHARSET=utf8;

CREATE TABLE `notifications` (
  `notification_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `type` tinyint(3) unsigned NOT NULL,
  `entity_type` tinyint(3) unsigned NOT NULL,
  `entity_id` int(10) unsigned NOT NULL,
  `message` varchar(512) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  KEY `type` (`type`),
  KEY `entity_type` (`entity_type`),
  KEY `entity_id` (`entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `question_tags` (
  `question_tag_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int(11) NOT NULL DEFAULT '0',
  `tag_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`question_tag_id`),
  KEY `question_id` (`question_id`),
  KEY `tag_id` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

CREATE TABLE `question_votes` (
  `question_vote_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `value` tinyint(4) NOT NULL,
  PRIMARY KEY (`question_vote_id`),
  KEY `question_id` (`question_id`),
  KEY `user_id` (`user_id`),
  KEY `value` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8;

CREATE TABLE `questions` (
  `question_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(128) NOT NULL,
  `question` mediumtext NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `views` int(10) unsigned NOT NULL DEFAULT '0',
  `comments` int(10) unsigned NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `user_id` (`user_id`),
  KEY `score` (`score`),
  KEY `comments` (`comments`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;

CREATE TABLE `video_request_votes` (
  `video_request_vote_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `video_request_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`video_request_vote_id`),
  KEY `video_request_id` (`video_request_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=374 DEFAULT CHARSET=utf8;

CREATE TABLE `video_requests` (
  `video_request_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`video_request_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
