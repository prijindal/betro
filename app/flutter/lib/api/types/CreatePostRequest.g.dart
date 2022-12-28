// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'CreatePostRequest.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreatePostRequest _$CreatePostRequestFromJson(Map<String, dynamic> json) =>
    CreatePostRequest(
      group_id: json['group_id'] as String,
      text_content: json['text_content'] as String?,
      media_content: json['media_content'] as String?,
    );

Map<String, dynamic> _$CreatePostRequestToJson(CreatePostRequest instance) =>
    <String, dynamic>{
      'group_id': instance.group_id,
      'text_content': instance.text_content,
      'media_content': instance.media_content,
    };
