// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'PostResourceUser.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PostResourceUser _$PostResourceUserFromJson(Map<String, dynamic> json) =>
    PostResourceUser(
      username: json['username'] as String,
      first_name: json['first_name'] as String?,
      last_name: json['last_name'] as String?,
    );

Map<String, dynamic> _$PostResourceUserToJson(PostResourceUser instance) =>
    <String, dynamic>{
      'username': instance.username,
      'first_name': instance.first_name,
      'last_name': instance.last_name,
    };
