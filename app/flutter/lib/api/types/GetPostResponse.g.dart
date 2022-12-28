// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'GetPostResponse.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GetPostResponse _$GetPostResponseFromJson(Map<String, dynamic> json) =>
    GetPostResponse(
      GetPost.fromJson(json['post'] as Map<String, dynamic>),
      PostUserResponse.fromJson(json['user'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$GetPostResponseToJson(GetPostResponse instance) =>
    <String, dynamic>{
      'post': instance.post,
      'user': instance.user,
    };

GetPost _$GetPostFromJson(Map<String, dynamic> json) => GetPost(
      key: json['key'] as String,
      id: json['id'] as String,
      user_id: json['user_id'] as String,
      media_content: json['media_content'] as String?,
      media_encoding: json['media_encoding'] as String?,
      text_content: json['text_content'] as String?,
      key_id: json['key_id'] as String,
      likes: json['likes'] as int,
      is_liked: json['is_liked'] as bool,
      created_at: DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$GetPostToJson(GetPost instance) => <String, dynamic>{
      'id': instance.id,
      'user_id': instance.user_id,
      'media_content': instance.media_content,
      'media_encoding': instance.media_encoding,
      'text_content': instance.text_content,
      'key_id': instance.key_id,
      'likes': instance.likes,
      'is_liked': instance.is_liked,
      'created_at': instance.created_at.toIso8601String(),
      'key': instance.key,
    };
