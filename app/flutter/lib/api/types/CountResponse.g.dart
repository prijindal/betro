// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'CountResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CountResponse _$CountResponseFromJson(Map<String, dynamic> json) =>
    CountResponse(
      notifications: json['notifications'] as int,
      settings: json['settings'] as int,
      groups: json['groups'] as int,
      followers: json['followers'] as int,
      followees: json['followees'] as int,
      approvals: json['approvals'] as int,
      posts: json['posts'] as int,
      conversations: json['conversations'] as int,
    );

Map<String, dynamic> _$CountResponseToJson(CountResponse instance) =>
    <String, dynamic>{
      'notifications': instance.notifications,
      'settings': instance.settings,
      'groups': instance.groups,
      'followers': instance.followers,
      'followees': instance.followees,
      'approvals': instance.approvals,
      'posts': instance.posts,
      'conversations': instance.conversations,
    };
