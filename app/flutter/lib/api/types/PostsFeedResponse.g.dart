// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'PostsFeedResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PostsFeedResponse _$PostsFeedResponseFromJson(Map<String, dynamic> json) =>
    PostsFeedResponse(
      posts: (json['posts'] as List<dynamic>)
          .map((e) => PostResponse.fromJson(e as Map<String, dynamic>))
          .toList(),
      users: (json['users'] as Map<String, dynamic>).map(
        (k, e) =>
            MapEntry(k, PostUserResponse.fromJson(e as Map<String, dynamic>)),
      ),
      keys: Map<String, String>.from(json['keys'] as Map),
      pageInfo: PageInfo.fromJson(json['pageInfo'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$PostsFeedResponseToJson(PostsFeedResponse instance) =>
    <String, dynamic>{
      'posts': instance.posts,
      'users': instance.users,
      'keys': instance.keys,
      'pageInfo': instance.pageInfo,
    };
