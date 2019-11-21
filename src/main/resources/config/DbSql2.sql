/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50528
 Source Host           : localhost:3306
 Source Schema         : spectrum

 Target Server Type    : MySQL
 Target Server Version : 50528
 File Encoding         : 65001

 Date: 21/11/2019 22:39:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `name_spell` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '拼音',
  `phone` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `birthday` date NULL DEFAULT NULL COMMENT '生日',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `weixin` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '微信',
  `qq` int(20) NULL DEFAULT NULL COMMENT 'QQ',
  `mark1` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备用1',
  `mark2` int(11) NULL DEFAULT NULL COMMENT '备用2',
  `mark3` datetime NULL DEFAULT NULL COMMENT '备用3',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
ALTER TABLE `contact` COMMENT  = '联系人信息表';


/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50528
 Source Host           : localhost:3306
 Source Schema         : spectrum

 Target Server Type    : MySQL
 Target Server Version : 50528
 File Encoding         : 65001

 Date: 22/11/2019 00:12:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for family_person
-- ----------------------------
DROP TABLE IF EXISTS `family_person`;
CREATE TABLE `family_person`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `clans` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '宗族',
  `surname` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓',
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '名',
  `formal` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '字',
  `nick` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '号',
  `gender` int(1) NULL DEFAULT NULL COMMENT '性别(1男0女)',
  `ranking` int(5) NULL DEFAULT NULL COMMENT '世',
  `senior` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '辈',
  `name_spell` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名全拼',
  `alive` int(1) NULL DEFAULT NULL COMMENT '是否在世(0殁1生)',
  `lunr_birthday` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生辰',
  `calen_birthday` date NULL DEFAULT NULL COMMENT '公历生日',
  `lunr_deathday` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '殁日',
  `calen_deathday` date NULL DEFAULT NULL COMMENT '公历殁日',
  `cemetery` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '墓葬信息',
  `address` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '住址',
  `phone` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `education` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '学历或经历',
  `experience` varchar(2000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个人详细资料',
  `farther_id` int(11) NULL DEFAULT NULL COMMENT '父亲id',
  `father_name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '父亲名字',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
ALTER TABLE `family_person` COMMENT  = '家族成员表';



/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50528
 Source Host           : localhost:3306
 Source Schema         : spectrum

 Target Server Type    : MySQL
 Target Server Version : 50528
 File Encoding         : 65001

 Date: 22/11/2019 00:21:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for kinsfolk_relation
-- ----------------------------
DROP TABLE IF EXISTS `kinsfolk_relation`;
CREATE TABLE `kinsfolk_relation`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `person_id` int(11) NULL DEFAULT NULL COMMENT '户主id',
  `relation` int(1) NULL DEFAULT NULL COMMENT '关系',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '姓名',
  `son_id` int(11) NULL DEFAULT NULL COMMENT '后代id(补填)',
  `calen_birthday` date NULL DEFAULT NULL COMMENT '生辰',
  `lunr_birthday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公历生日',
  `calen_deathday` date NULL DEFAULT NULL COMMENT '殁日',
  `lunr_deathday` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公历殁日',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `orther_info` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '其他信息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
ALTER TABLE `kinsfolk_relation` COMMENT  = '成员家属表';




