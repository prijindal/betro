// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'PostResource.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PostResource _$PostResourceFromJson(Map<String, dynamic> json) => PostResource(
      id: json['id'] as String,
      user_id: json['user_id'] as String,
      text_content: json['text_content'] as String?,
      media_encoding: json['media_encoding'] as String?,
      likes: json['likes'] as int,
      is_liked: json['is_liked'] as bool,
      user: json['user'] == null
          ? null
          : PostResourceUser.fromJson(json['user'] as Map<String, dynamic>),
      created_at: DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$PostResourceToJson(PostResource instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.user_id,
      'text_content': instance.text_content,
      'media_encoding': instance.media_encoding,
      'likes': instance.likes,
      'is_liked': instance.is_liked,
      'user': instance.user,
      'created_at': instance.created_at.toIso8601String(),
    };
